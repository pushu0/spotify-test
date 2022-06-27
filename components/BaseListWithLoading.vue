<template>
  <v-container class="d-flex" style="flex-wrap: wrap" align="center">
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
      <component :is="tag" v-for="item in items" :key="item.id" v-bind="$attrs">
        <slot :item="item" />
      </component>
    </template>
  </v-container>
</template>
<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseList',
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
    tagAttrs: {
      type: Object,
      required: false,
      default: () => ({}),
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
