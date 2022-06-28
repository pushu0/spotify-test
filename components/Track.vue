<template>
  <v-card
    :height="height"
    rounded="lg"
    light
    class="track-card content"
    :elevation="isPlaying ? 24 : 0"
    :class="{ 'is-playing': isPlaying }"
  >
    <v-img
      :src="item.imageUrl"
      transition="fade-transition"
      :height="height"
      class="grey darken-4 scaled"
      content-class="content"
    >
    </v-img>
    <div class="background">
      <v-icon
        v-if="isPlaying"
        color="black"
        x-large
        class="playing-icon elevation-3"
      >
        mdi-play</v-icon
      >
      <v-card-title class="subtitle-2">
        {{ item.name }}
      </v-card-title>
      <v-card-subtitle class="caption">
        By: {{ item.artists }}
      </v-card-subtitle>
    </div>
  </v-card>
</template>
<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { SimplifiedTrack } from '~/types'

export default defineComponent({
  name: 'SimplifiedTrack',

  props: {
    item: {
      type: Object as PropType<SimplifiedTrack>,
      required: false,
      default: () => ({
        name: '',
        artists: '',
        imageUrl: '',
      }),
    },
    isPlaying: {
      type: Boolean,
      required: false,
      default: false,
    },
    height: {
      type: Number,
      required: false,
      default: 300,
    },
  },
})
</script>
<style scoped>
.track-card {
  overflow: hidden;
}
::v-deep .content {
  position: relative;
}
.background {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  border-radius: 0px !important;
}
::v-deep .scaled .v-image__image {
  transform: scale(1.1);
}
.is-playing {
  border: 2px solid white;
}
.playing-icon {
  transform: translate(0, -50%);
  font-size: 40px;
  position: absolute;
  right: 20px;
  top: 0;
  background-color: white;
  border-radius: 30px;
}
</style>
