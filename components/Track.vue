<template>
  <v-card height="300" rounded="lg" light>
    <v-img
      :src="item.imageUrl"
      transition="fade-transition"
      height="300"
      class="grey darken-4 scaled"
      content-class="content"
    >
      <div class="background">
        <v-card-title class="subtitle-2">
          {{ item.name }}
        </v-card-title>
        <v-card-subtitle class="caption">
          By: {{ item.artists }}
        </v-card-subtitle>
      </div>
    </v-img>
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
  },
  setup() {},
})
</script>
<style scoped>
::v-deep .content {
  position: relative;
}
.background {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
}
::v-deep .scaled .v-image__image {
  transform: scale(1.1);
}
</style>
