<template>
  <div>Loading</div>
</template>
<script>
export default {
  name: 'CallBackPage',
  mounted() {
    const { valid } = this.$auth.check()
    if (!valid) error('Ooops, something went wrong')
  },
}
</script>
