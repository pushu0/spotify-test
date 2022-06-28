<template>
  <v-container>
    <v-btn @click="login">Login with Spotify</v-btn>
    <v-btn @click="login2">Login with Spotify 2</v-btn>
  </v-container>
</template>
<script>
import { defineComponent, useContext, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  auth: 'guest',
  setup() {
    const { $auth } = useContext()
    const router = useRouter()

    const login = async () => {
      try {
        await $auth.loginWith('custom')
      } catch (error) {
        router.push({ name: 'error', params: { error } })
      }
    }

    const login2 = async () => {
      try {
        await $auth.loginWith('oauth')
      } catch (error) {
        router.push({ name: 'error', params: { error } })
      }
    }
    return {
      login,
      login2,
    }
  },
})
</script>
