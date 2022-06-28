<template>
  <v-container
    fluid
    style="height: 100vh"
    class="d-flex flex-column justify-center align-center"
  >
    <div class="d-flex flex-column justify-center align-center">
      <v-row></v-row>
      <v-row>
        <v-col>
          <v-btn @click="login"
            >Login with implicit grant
            <v-icon class="ml-3">mdi-spotify</v-icon></v-btn
          >
        </v-col>
        <v-col>
          <v-btn @click="login2"
            >Login with OAUth2 <v-icon class="ml-3">mdi-spotify</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </div>
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
