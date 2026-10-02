// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

import { WebcamInfoApi } from '@/api';
import { ImageGallery, SkiAreaLinked, WebcamInfo } from '@/api/models';
import { getSkiAreaPolygonWkt } from './measuringPoints';

export interface Webcam {
  id: string;
  name: string;
  image: string;
  liveUrl: string | null;
}

// the API delivers these too, the generated model predates them
type WebcamItem = WebcamInfo & {
  ImageGallery?: ImageGallery[] | null;
  Detail?: { [lang: string]: { Title?: string | null } | null } | null;
};

// preferred image width: sharp in the detail view, but no multi-megapixel originals
const MIN_WIDTH = 800;
const MAX_WIDTH = 2000;

function https(url: string): string {
  return url.replace(/^http:\/\//i, 'https://');
}

function pickImage(webcam: WebcamItem): string | null {
  const gallery = (webcam.ImageGallery ?? []).filter((image) => image.ImageUrl);
  const sized = gallery
    .filter((image) => (image.Width ?? 0) > 0)
    .sort((a, b) => (a.Width ?? 0) - (b.Width ?? 0));
  const best =
    sized.find(
      (image) =>
        (image.Width ?? 0) >= MIN_WIDTH && (image.Width ?? 0) <= MAX_WIDTH
    ) ??
    sized.filter((image) => (image.Width ?? 0) <= MAX_WIDTH).pop() ??
    gallery[0];
  // idm webcams have no gallery sizes; their Webcamurl is the image itself
  const url = best?.ImageUrl ?? webcam.Previewurl ?? webcam.Webcamurl;
  return url ? https(url) : null;
}

function toWebcam(webcam: WebcamItem, language: string): Webcam | null {
  const image = pickImage(webcam);
  if (!image) return null;
  const names = webcam.Webcamname ?? {};
  const name =
    names[language] ??
    webcam.Detail?.[language]?.Title ??
    Object.values(names).find((n) => !!n) ??
    webcam.Shortname ??
    '';
  // for feratel/panomax/panocloud Webcamurl is the live viewer page, not an image
  const liveUrl =
    webcam.Webcamurl && https(webcam.Webcamurl) !== image
      ? webcam.Webcamurl
      : null;
  return { id: webcam.Id ?? image, name, image, liveUrl };
}

function queryWebcams(
  language: string,
  idlist: string | undefined,
  polygon: string | undefined
): Promise<WebcamItem[]> {
  return new WebcamInfoApi()
    .v1WebcamInfoGet(
      language,
      1,
      200,
      undefined,
      idlist,
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
      undefined,
      undefined,
      false,
      // polygon is not part of the generated client, pass it as extra query param
      polygon ? { params: { polygon } } : undefined
    )
    .then((value) => value.data.Items ?? []);
}

/**
 * Webcams of a ski area: the webcams linked to the ski area (RelatedContent,
 * these mostly have no coordinates) plus all webcams inside the ski area polygon.
 */
export function loadSkiAreaWebcams(
  item: SkiAreaLinked,
  language: string
): Promise<Webcam[]> {
  const linkedIds = (item.RelatedContent ?? [])
    .filter((content) => content.Type == 'webcam' && content.Id)
    .map((content) => content.Id as string);
  const polygon = getSkiAreaPolygonWkt(item);

  return Promise.all([
    linkedIds.length
      ? queryWebcams(language, linkedIds.join(','), undefined)
      : Promise.resolve([]),
    polygon ? queryWebcams(language, undefined, polygon) : Promise.resolve([]),
  ]).then(([linked, inPolygon]) => {
    const byId = new Map<string, Webcam>();
    [...linked, ...inPolygon].forEach((raw) => {
      const webcam = toWebcam(raw, language);
      if (webcam && !byId.has(webcam.id)) byId.set(webcam.id, webcam);
    });
    return Array.from(byId.values());
  });
}
