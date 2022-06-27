import { Plugin } from '@nuxt/types'
import { SpotifyApi } from '~/api/spotify'

interface Api {
  spotify: SpotifyApi
}

declare module 'vue/types/vue' {
  interface Vue {
    $api: Api
  }
}

declare module '@nuxt/types' {
  interface Context {
    $api: Api
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line
  interface Store<S> {
    $api: Api
  }
}

const api: Plugin = ({ $axios }, inject) => {
  const api = {
    spotify: new SpotifyApi($axios),
  }

  inject('api', api)
}

export default api
