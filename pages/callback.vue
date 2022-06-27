<template>
  <div>Loading</div>
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
      $auth.refreshTokens()
      const { valid } = $auth.check()
      // TODO redirect to error page
      if (!valid) {
        console.error('Ooops, something went wrong')
        return
      }
      router.push('/')
    })
  },
})
</script>
