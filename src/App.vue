<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  watch: {
    '$route': function () {
      this.$store.dispatch('alert/clearAlert')
    }
  }
}
</script>