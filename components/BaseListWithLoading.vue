<template>
  <v-container class="d-flex ma-0 pa-0" style="flex-wrap: wrap" align="center">
    <template v-if="!items.length">
      <component
        :is="tag"
        v-for="item in loadingItems"
        :key="item"
        v-bind="$attrs"
      >
        <v-skeleton-loader
          :key="item"
          v-bind="loadingAttrs"
        ></v-skeleton-loader>
      </component>
    </template>
    <template v-else>
      <component
        :is="tag"
        v-for="(item, index) in items"
        :key="item.id || index"
        v-bind="$attrs"
      >
        <slot :item="item" />
      </component>
    </template>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import { VCol, VRow } from 'vuetify/lib'

export default defineComponent({
  name: 'BaseList',
  components: { VCol, VRow },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    tag: {
      type: String,
      required: false,
      default: 'v-col',
    },
    loadingItems: {
      type: Number,
      requrired: false,
      default: 12,
    },
    loadingAttrs: {
      type: Object,
      required: false,
      default: () => ({
        height: 30,
        type: 'text',
      }),
    },
  },
  setup() {},
})
</script>
