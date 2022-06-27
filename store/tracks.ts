import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Collection } from '~/types/index'

interface RootState {
  collection: Collection<SpotifyApi.TrackObjectFull>
  filters: Record<keyof SpotifyApi.TrackObjectFull, string[]>
}

export const state = () => ({
  collection: {},
})

export const getters: GetterTree<RootState, RootState> = {
  collection: (state) => state.collection,
  list: (state) => Object.values(state.collection),
}

export const mutations: MutationTree<RootState> = {
  setCollection: (state, newCollection: SpotifyApi.TrackObjectFull[]) => {
    state.collection = newCollection.reduce(
      (collection, track) => ({ ...collection, [track.id]: track }),
      {}
    )
  },
}

export const actions: ActionTree<RootState, RootState> = {
  async fetchRecent({ commit }) {
    const result = await this.$api.spotify.getRecentlyPlayedTracks()

    let artists: SpotifyApi.ArtistObjectSimplified[] = []
    const tracks: SpotifyApi.TrackObjectFull[] = []

    result.items.forEach(({ track }) => {
      tracks.push(track)
      artists = artists.concat(track.artists)
    })

    commit('setCollection', tracks)
    commit('artists/setCollection', artists, { root: true })
  },
}
