<template>
  <v-container>
    <v-btn @click="userLogin">Login with Spotify</v-btn>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: '',
      },
    }
  },
  methods: {
    async userLogin() {
      try {
        await this.$auth.loginWith('custom')
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
