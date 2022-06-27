// ArtistObjectSimplified[];
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Collection } from '~/types/index'

interface ArtistsState {
  collection: Collection<SpotifyApi.ArtistObjectSimplified>
}

export const state = () => ({
  collection: {},
})

export const getters: GetterTree<ArtistsState, ArtistsState> = {
  collection: (state) => state.collection,
  list: (state) => Object.values(state.collection),
}

export const mutations: MutationTree<ArtistsState> = {
  setCollection: (
    state,
    newCollection: SpotifyApi.ArtistObjectSimplified[]
  ) => {
    state.collection = newCollection.reduce(
      (collection, artist) => ({ ...collection, [artist.id]: artist }),
      {}
    )
  },
}

export const actions: ActionTree<ArtistsState, ArtistsState> = {}
