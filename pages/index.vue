<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <h1>
          Most played tracks <span>{{ postTitle }}</span>
        </h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="7" md="9">
        <BaseListWithLoading
          :items="trackList"
          cols="12"
          md="4"
          lg="3"
          :loading-attrs="{ height: 300, type: 'card' }"
        >
          <template #default="{ item }">
            <Track
              :item="item"
              :is-playing="currentlyPlayingTrackId === item.id"
            />
          </template>
        </BaseListWithLoading>
      </v-col>
      <v-col cols="5" md="3" class="px-5 pt-4 mt-3">
        <v-row class="mb-5">
          <h3 style="display: block">Most played artists</h3>
          <v-btn
            v-if="appliedArtistFilters.length"
            small
            icon
            @click="clearFilters"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <BaseListWithLoading
            :items="artistsList"
            tag="div"
            class="flex-column"
          >
            <template #default="{ item }">
              <ArtistListItem
                :name="item.name"
                :is-selected="isFilterApplied(item.id)"
                @click="handleFilter(item.id)"
              />
            </template>
          </BaseListWithLoading>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  useRouter,
  useStore,
  computed,
} from '@nuxtjs/composition-api'
import { mapTrackToSimplifiedTrack } from '~/utils/trackUtils'
import { useRouteFilter } from '~/compositions/useRouteFilter'
import BaseListWithLoading from '~/components/BaseListWithLoading.vue'
import ArtistListItem from '~/components/Artist.vue'
import Track from '~/components/Track.vue'

const ARTISTS_FILTER_KEY = 'artists'
const CURRENTLY_PLAYING_REFRESH_RATE = 15000

export default defineComponent({
  name: 'IndexPage',
  components: { BaseListWithLoading, Track, ArtistListItem },
  setup() {
    const store = useStore()
    const router = useRouter()

    const trackList = computed<SpotifyApi.TrackObjectFull[]>(
      () => store.getters['tracks/list']
    )
    const currentlyPlayingTrackId = computed(
      () => store.getters['tracks/playing']
    )
    const artistsList = computed(() => store.getters['artists/list'])
    const artistsCollection = computed(
      () => store.getters['artists/collection']
    )

    const {
      applied: appliedArtistFilters,
      isApplied: isFilterApplied,
      toggle: toggleFilter,
    } = useRouteFilter(ARTISTS_FILTER_KEY)

    const filteredList = computed(() =>
      appliedArtistFilters.value.length
        ? trackList.value.filter((track) =>
            track.artists.some(({ id }) =>
              appliedArtistFilters.value.includes(id)
            )
          )
        : trackList.value
    )

    const fetchTracks = () => store.dispatch('tracks/fetchRecent')
    const fetchCurrentlyPlaying = () =>
      store.dispatch('tracks/fetchCurrentlyPlaying')

    onMounted(() => {
      fetchTracks()
      fetchCurrentlyPlaying()
      setInterval(fetchCurrentlyPlaying, CURRENTLY_PLAYING_REFRESH_RATE)
    })

    const applyArtistFilter = (items: string[]) =>
      router.push({
        name: router.currentRoute.name!,
        query: {
          ...router.currentRoute.query,
          [ARTISTS_FILTER_KEY]: items,
        },
      })

    return {
      trackList: computed(() =>
        filteredList.value.map(mapTrackToSimplifiedTrack)
      ),
      artistsList,
      currentlyPlayingTrackId,

      appliedArtistFilters,
      isFilterApplied,
      handleFilter: (filter: string) => {
        const query = toggleFilter(filter)
        applyArtistFilter(query)
      },
      clearFilters: () => applyArtistFilter([]),

      postTitle: computed(() =>
        appliedArtistFilters.value.length && artistsList.value.length
          ? `by ${appliedArtistFilters.value
              .map((id) => artistsCollection.value[id].name)
              .join(', ')}`
          : ''
      ),
    }
  },
})
</script>
<style scoped>
h1 span {
  color: #7d7d7d;
}
</style>
