<template>
  <v-container>
    <v-btn @click="login">Login with Spotify</v-btn>
    <v-btn @click="login2">Login with Spotify 2</v-btn>
  </v-container>
</template>
<script>
import { defineComponent, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  auth: 'guest',
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

    const login2 = async () => {
      try {
        await $auth.loginWith('oauth')
      } catch (err) {
        // TODO redirect to error page
        console.log(err)
      }
    }
    return {
      login,
      login2,
    }
  },
})
</script>
