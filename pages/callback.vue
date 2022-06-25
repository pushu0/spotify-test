<template>
  <div>Loading</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()

    onMounted(() => {
      const { valid } = $auth.check()
      // TODO redirect to error page
      if (!valid) console.error('Ooops, something went wrong')
    })
  },
})
</script>
