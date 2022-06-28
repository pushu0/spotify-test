// ArtistObjectSimplified[];
import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Collection } from '~/types/index'
import { addItemToCollection } from '~/utils'

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
  upsertItem: (
    state,
    artists: SpotifyApi.ArtistObjectSimplified[]
  ) => {
    state.collection = {
      ...artists.reduce(addItemToCollection, {}),
      ...state.collection,
    }
  },
  setCollection: (
    state,
    newCollection: SpotifyApi.ArtistObjectSimplified[]
  ) => {
    state.collection = newCollection.reduce(addItemToCollection, {})
  },
}

export const actions: ActionTree<ArtistsState, ArtistsState> = {}
