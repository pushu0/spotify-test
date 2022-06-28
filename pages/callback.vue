<template>
  <v-container
    fluid
    style="height: 100vh"
    class="d-flex justify-center align-center"
  >
    <v-progress-circular :size="50" indeterminate />
  </v-container>
</template>
<script lang="ts">
import {
  defineComponent,
  onMounted,
  useContext,
  useRouter,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()
    const router = useRouter()

    onMounted(() => {
      const { valid } = $auth.check()

      if (!valid) {
        // eslint-disable-next-line no-console
        console.error('Ooops, something went wrong')
        router.push({
          name: 'error',
          params: { error: 'Authentication failed' },
        })
        return
      }
      router.push('/')
    })
  },
})
</script>
