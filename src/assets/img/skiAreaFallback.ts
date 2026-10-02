// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

// generic ski area illustration, used when a ski area has no (working) image;
// loaded as data URI (bypassing vue-svg-loader, which turns svgs into components)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const image = require('!!url-loader?limit=100000!./skiarea-fallback.svg');

export default (image.default ?? image) as string;
