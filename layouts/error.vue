<template>
  <v-app dark>
    <h1>
      {{ errorMessage }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
  </v-app>
</template>

<script lang="ts">
import { useRoute } from '@nuxtjs/composition-api'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
  layout: 'error',
  setup() {
    const route = useRoute()
    const errorMessage = computed(() => route.value.params.error)
    return { errorMessage }
  },
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
