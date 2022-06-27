<template>
  <v-btn
    text
    class="button"
    :class="{ selected: isSelected }"
    @click="$emit('click')"
  >
    <v-icon left dark>
      {{ isSelected ? 'mdi-check' : 'mdi-plus' }}
    </v-icon>
    {{ name }}
  </v-btn>
</template>
<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  name: 'SimplifiedArtist',
  props: {
    name: {
      type: String,
      required: false,
      default: '',
    },
    isSelected: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup() {},
})
</script>
<style scoped>
.button {
  margin-left: 0px;
  transition: all 0.3s;
}
.button.selected {
  margin-left: 20px;
}
</style>
