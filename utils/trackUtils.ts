import { SimplifiedTrack } from '~/types'

export const mapTrackToSimplifiedTrack = (
  track: SpotifyApi.TrackObjectFull
): SimplifiedTrack => {
  const imageUrl = track.album.images[0].url
  return {
    id: track.id,
    name: track.name,
    artists: track.artists.map(({ name }) => name).join(', '),
    imageUrl,
  }
}


export const isTrack = (item: SpotifyApi.CurrentlyPlayingObject['item']): item is SpotifyApi.TrackObjectFull =>
item?.type === 'track'
