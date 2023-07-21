// SPDX-FileCopyrightText: NOI Techpark <digital@noi.bz.it>
//
// SPDX-License-Identifier: AGPL-3.0-or-later

export interface APIResponse<T> {
  CurrentPage: number;
  Items: T[] | null;
  NextPage: string | null;
  PreviousPage: string | null;
  TotalPages: number;
  TotalResults: number;
}