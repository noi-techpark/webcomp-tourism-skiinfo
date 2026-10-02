// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

const DOLOMITI_SUPERSKI_REGION_ID = '8260DC5B815D40B98A1B53E84EC2B419';

/**
 * Translates the source attribute into the SkiArea API source/rawfilter.
 * Exception: choosing "dss" also shows the idm ski areas that belong to the
 * ski region Dolomiti Superski (without showing all other idm ski areas).
 */
export function skiAreaSourceFilter(
  source?: string
): { source?: string; rawfilter?: string } {
  const sources = (source ?? '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter((s) => s !== '');

  if (sources.length === 0) return {};

  if (sources.includes('dss') && !sources.includes('idm')) {
    return {
      source: [...sources, 'idm'].join(','),
      rawfilter: `or(ne(Source,'idm'),eq(SkiRegionId,'${DOLOMITI_SUPERSKI_REGION_ID}'))`,
    };
  }

  return { source: sources.join(',') };
}
