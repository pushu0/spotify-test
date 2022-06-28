export type Collection<Type> = {
  [id in string | number | keyof Type]: Type
}

export interface SimplifiedTrack {
  id: string,
  name: string
  artists: string
  imageUrl: string
}
export interface SimplifiedArtist {
  id: string
  name: string
  isSelected: boolean
}
