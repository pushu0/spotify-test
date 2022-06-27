import { SimplifiedTrack } from '~/types'

export const mapTrackToSimplifiedTrack = (
  track: SpotifyApi.TrackObjectFull
): SimplifiedTrack => {
  const imageUrl = track.album.images[0].url
  return {
    name: track.name,
    artists: track.artists.map(({ name }) => name).join(', '),
    imageUrl,
  }
}
