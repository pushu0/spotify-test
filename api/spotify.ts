import { BaseNuxtApi } from './baseApi'

export class SpotifyApi extends BaseNuxtApi {
  // TODO: getRecentlyPlayedTracks(after?: number, before?: number, limit?: number)
  getRecentlyPlayedTracks(): Promise<
    SpotifyApi.PagingObject<SpotifyApi.PlayHistoryObject>
  > {
    return this.axios.$get('/v1/me/player/recently-played' + query)
  }
}
