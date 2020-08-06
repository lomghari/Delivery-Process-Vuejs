<template>
  <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
</template>

<script>
export default {
  computed: {
    overlay () {
      return true
    }
  },
  created () {
    this.$store.dispatch('setUser')
  }
}
</script>
