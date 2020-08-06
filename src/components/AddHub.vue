<template>
<v-container class="pa-6">
  <h1 class="text-h5 font-weight-light">Create Shipment Prouvder:</h1>
  <v-divider class="my-5"></v-divider>
  <v-form class="mt-16">
    <v-text-field label="Hub"  prepend-icon="apartment" v-model="HubName">
     </v-text-field>
     <v-text-field label="Location"  prepend-icon="place" v-model="HubLocation">
     </v-text-field>
     <v-text-field label="Phone"  prepend-icon="call" v-model="HubPhone">
     </v-text-field>
     <v-text-field label="City"  prepend-icon="account_balance" v-model="HubCity">
     </v-text-field>
     <v-btn depressed width="100%" @click.prevent="CreateHub">
       <v-icon left>store</v-icon>
       <span>Create</span>
     </v-btn>
  </v-form>
</v-container>
</template>

<script>
export default {
  methods: {
    CreateHub () {
      this.$store.dispatch('createHub')
    }
  },
  computed: {
    HubName: {
      get () {
        return this.$store.getters.getHubName
      },
      set (value) {
        this.$store.dispatch('setHubName', value)
      }
    },
    HubLocation: {
      get () {
        return this.$store.getters.getHubLocation
      },
      set (value) {
        this.$store.dispatch('setHubLocation', value)
      }
    },
    HubCity: {
      get () {
        return this.$store.getters.getHubCity
      },
      set (value) {
        this.$store.dispatch('setHubCity', value)
      }
    },
    HubPhone: {
      get () {
        return this.$store.getters.getHubPhone
      },
      set (value) {
        this.$store.dispatch('setHubPhone', value)
      }
    }

  }
}
</script>
<style scoped>
.v-form{
  width: 40%;
  margin: 0 auto;
}
</style>
