// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { ODHActivityPoiApi } from '@/api/api';
import { ODHActivityPoiLinked, SkiAreaLinked } from '@/api/models';

export type PoiKind = 'lifts' | 'slopes';

type SkiAreaWithGeo = SkiAreaLinked & {
  Geo?: { [key: string]: { Geometry?: string | null } | null } | null;
};

interface PoiQuery {
  source?: string;
  tagfilter?: string;
  active?: boolean;
  latitude?: string;
  longitude?: string;
  radius?: string;
  rawfilter?: string;
  polygon?: string;
}

// filter on Tags (tagfilter); the ODH tags / SmgTags (odhtagfilter) are deprecated
const TAGS: Record<PoiKind, string> = {
  lifts: 'lifts',
  slopes: 'slopes',
};

function queryPois(
  query: PoiQuery,
  language: string
): Promise<ODHActivityPoiLinked[]> {
  return new ODHActivityPoiApi()
    .v1ODHActivityPoiGet(
      language,
      1,
      1000,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      language,
      undefined,
      undefined,
      query.source,
      undefined,
      undefined,
      undefined,
      query.active,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      query.tagfilter,
      undefined,
      undefined,
      undefined,
      query.latitude,
      query.longitude,
      query.radius,
      undefined,
      undefined,
      query.rawfilter,
      undefined,
      false,
      // polygon is not part of the generated client, pass it as extra query param
      query.polygon ? { params: { polygon: query.polygon } } : undefined
    )
    .then((value) => value.data.Items ?? []);
}

function getPolygon(item: SkiAreaWithGeo): string | undefined {
  const geometry = item.Geo?.track?.Geometry;
  return geometry && /^(MULTI)?POLYGON/i.test(geometry) ? geometry : undefined;
}

/**
 * Loads the lifts or slopes belonging to a ski area:
 * 1. ski area has a polygon (Geo.track) -> everything inside the polygon
 *    (source dss for dss ski areas, lts otherwise)
 * 2. discoverswiss ski area -> lifts/slopes whose Mapping.discoverswiss
 *    "locatedAt.identifier" references the ski area
 * 3. fallback -> radius search around the ski area position
 */
export function loadSkiAreaPois(
  item: SkiAreaLinked,
  kind: PoiKind,
  language: string
): Promise<ODHActivityPoiLinked[]> {
  const polygon = getPolygon(item);
  if (polygon) {
    return queryPois(
      {
        source: item.Source === 'dss' ? 'dss' : 'lts',
        tagfilter: TAGS[kind],
        active: true,
        polygon,
      },
      language
    );
  }

  const discoverswissId = item.Mapping?.discoverswiss?.id;
  if (item.Source === 'discoverswiss' && discoverswissId) {
    // discoverswiss lifts/slopes are all flagged inactive, so no active filter
    return queryPois(
      {
        source: 'discoverswiss',
        tagfilter: TAGS[kind],
        rawfilter: `eq(Mapping.discoverswiss."locatedAt.identifier",'${discoverswissId}')`,
      },
      language
    );
  }

  return queryPois(
    {
      source: 'lts',
      tagfilter: TAGS[kind],
      active: true,
      latitude: item.Latitude?.toString(),
      longitude: item.Longitude?.toString(),
      radius: (item.AreaRadius ?? 3000).toString(),
    },
    language
  );
}
