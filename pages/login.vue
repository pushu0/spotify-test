<template>
  <v-container>
    <v-btn @click="login">Login with Spotify</v-btn>
  </v-container>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const { $auth } = useContext()

    const login = async () => {
      try {
        await $auth.loginWith('custom')
      } catch (err) {
        // TODO redirect to error page
        console.log(err)
      }
    }
    return {
      login,
    }
  },
})
</script>
