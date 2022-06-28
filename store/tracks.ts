import { GetterTree, ActionTree, MutationTree } from 'vuex'
import { Collection } from '~/types/index'
import { addItemToCollection } from '~/utils'
import { isTrack } from '~/utils/trackUtils'

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
  upsertItem: (state, track: SpotifyApi.TrackObjectFull) => {
    state.collection = {
      [track.id]: track,
      ...state.collection,
    }
  },
  setCollection: (state, newCollection: SpotifyApi.TrackObjectFull[]) => {
    state.collection = newCollection.reduce(
      addItemToCollection,
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

  async fetchCurrentlyPlaying({ commit }) {
    const result = await this.$api.spotify.getCurrentlyPlayingTrack()

    if (result.is_playing) {
      commit('upsertItem', result.item)
      // podcast don't have artists
      if (isTrack(result.item))
        commit('artists/upsertItem', result.item.artists, {
          root: true,
        })
    }
    return result
  },
}
