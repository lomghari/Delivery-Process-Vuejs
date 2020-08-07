<template>
    <v-container>
        <h2 class="font-weight-light text-uppercase text-h3 px-5">Switch:</h2>
        <v-divider class="my-5"></v-divider>
        <div class="d-flex flex-row justify-space-between align-center">
            <h2 class="font-weight-light text-uppercase text-h3 px-5 text-subtitle-1">Hubs:</h2>
            <v-btn depressed small class="mr-6" @click.passive="SwitchHub">
                <span>Switch</span>
                <v-icon right small>autorenew</v-icon>
            </v-btn>
        </div>
        <v-divider class="my-2"></v-divider>
        <v-radio-group v-model="Select" class="mx-6">
        <v-radio v-for="item in Hubs" :key="item.id" :label="item.Provider_Name" :value="item.id"></v-radio>
      </v-radio-group>
    </v-container>
</template>

<script>
export default {
  computed: {
    Hubs () {
      return this.$store.state.HubStore.Hubs
    },
    Select: {
      get () {
        return this.$store.getters.getHubSelect
      },
      set (value) {
        this.$store.dispatch('setHubSelected', value)
      }
    }
  },
  methods: {
    SelectRe () {
      console.log(this.Select)
    },
    SwitchHub () {
      this.$store.dispatch('UpdateUserCrHub')
      this.$store.dispatch('setUser')
    }
  },
  beforeCreate () {
    this.$store.dispatch('setHubSelected', this.$store.state.Auth.User.Current_Provider)
  }
}
</script>

<style>

</style>
