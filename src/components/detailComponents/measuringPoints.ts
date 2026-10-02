// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { WeatherApi } from '@/api/api';
import { Measuringpoint, SkiAreaLinked } from '@/api/models';

export type LatLng = [number, number];

type SkiAreaWithGeo = SkiAreaLinked & {
  Geo?: { [key: string]: { Geometry?: string | null } | null } | null;
};

/** WKT geometry of the ski area polygon (Geo.track), if there is one */
export function getSkiAreaPolygonWkt(item: SkiAreaLinked): string | undefined {
  const geometry = (item as SkiAreaWithGeo).Geo?.track?.Geometry;
  return geometry && /^(MULTI)?POLYGON/i.test(geometry) ? geometry : undefined;
}

/** Outer rings of a WKT POLYGON / MULTIPOLYGON as [lat, lng] lists */
export function parsePolygonRings(wkt?: string): LatLng[][] {
  if (!wkt) return [];
  // the outline of every polygon is the ring right after "((";
  // holes follow as ", (...)" and are ignored
  const rings: string[] = [];
  const outline = /\(\(([^()]+)\)/g;
  let match: RegExpExecArray | null;
  while ((match = outline.exec(wkt)) !== null) rings.push(match[1]);
  return rings.map((ring) =>
    ring.split(',').map((pair) => {
      const [lng, lat] = pair
        .trim()
        .split(/\s+/)
        .map(Number);
      return [lat, lng] as LatLng;
    })
  );
}

export function insideRing([lat, lng]: LatLng, ring: LatLng[]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [yi, xi] = ring[i];
    const [yj, xj] = ring[j];
    if (
      yi > lat !== yj > lat &&
      lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
    )
      inside = !inside;
  }
  return inside;
}

/** Measuring points without real coordinates come with 0/0 (or nothing) */
export function hasPosition(point: Measuringpoint): boolean {
  return !!point.Latitude && !!point.Longitude;
}

function queryMeasuringpoints(
  rawfilter: string | undefined,
  polygon: string | undefined
): Promise<Measuringpoint[]> {
  return new WeatherApi()
    .v1WeatherMeasuringpointGet(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      true,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      rawfilter,
      undefined,
      undefined,
      // polygon is not part of the generated client, pass it as extra query param
      polygon ? { params: { polygon } } : undefined
    )
    .then((value) => value.data ?? []);
}

/**
 * Measuring points of a ski area:
 * - points linked to the ski area via SkiAreaIds (discoverswiss links with its own
 *   lowercase reference "urn:skiarea:discoverswiss:SkiResort:<id>")
 * - plus points inside the ski area polygon (points with coordinates but no link)
 * Points that do have coordinates outside the polygon are left out.
 */
export function loadSkiAreaMeasuringpoints(
  item: SkiAreaLinked
): Promise<Measuringpoint[]> {
  if (!item.Id) return Promise.resolve([]);

  const refs = [item.Id];
  const discoverswissId = item.Mapping?.discoverswiss?.id;
  if (discoverswissId)
    refs.push(`urn:skiarea:discoverswiss:SkiResort:${discoverswissId}`);
  const linkedFilter = `in(SkiAreaIds.[*],${refs
    .map((ref) => `"${ref}"`)
    .join(',')})`;

  const wkt = getSkiAreaPolygonWkt(item);
  const rings = parsePolygonRings(wkt);

  return Promise.all([
    queryMeasuringpoints(linkedFilter, undefined),
    wkt ? queryMeasuringpoints(undefined, wkt) : Promise.resolve([]),
  ]).then(([linked, inPolygon]) => {
    const byId = new Map<string, Measuringpoint>();
    [...linked, ...inPolygon].forEach((point) =>
      byId.set(point.Id ?? point.Shortname ?? '', point)
    );
    return Array.from(byId.values()).filter(
      (point) =>
        !rings.length ||
        !hasPosition(point) ||
        rings.some((ring) =>
          insideRing(
            [point.Latitude as number, point.Longitude as number],
            ring
          )
        )
    );
  });
}
