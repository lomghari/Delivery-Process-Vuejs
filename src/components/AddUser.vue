<template>
<v-container class="pa-6">
  <h1 class="text-h5 font-weight-light">Add User:</h1>
  <v-divider class="my-5"></v-divider>
  <div class="d-flex justify-space-between">
  <div class="user mx-2">
  <h4 class="text-subtitle-1">Information:</h4>
  <v-divider class="my-2"></v-divider>
  <v-form>
     <v-text-field label="Username"  prepend-icon="account_circle" v-model="Username">
     </v-text-field>
     <v-text-field label="Email"  prepend-icon="email" v-model="Email">
     </v-text-field>
     <v-text-field label="Password"  prepend-icon="vpn_key" v-model="Password" :type="showPassword? 'text':'password'"  :append-icon="showPassword? 'visibility':'visibility_off'" @click:append="showPassword=!showPassword">
     </v-text-field>
     <v-text-field label="Fullname"  prepend-icon="business" v-model="Fullname">
     </v-text-field>
     <v-divider class="mt-5 mb-8"></v-divider>
     <v-btn depressed class="primary d-block" large width="100%" :loading="btnLoader" @click.prevent="Add">
        <span>Enregistrer</span>
     </v-btn>
  </v-form>
  </div>
  <div class="hub mx-2">
  <h4 class="text-subtitle-1">Hubs:</h4>
  <v-divider class="my-2"></v-divider>
  <v-list :dense="true">
    <v-list-item-title v-if="!Hubloader">
      <v-progress-circular indeterminate color="black" size="50" width="5" ></v-progress-circular>
    </v-list-item-title>
    <div v-if="Hubloader">
    <v-list-item v-for="(item) in Hubs" :key="item.id">
      <v-list-item-content>
        <v-checkbox   :value="item.id" :key="item.id" @change="CheckISCheck($event)" v-model="ChakedHub">
          <template v-slot:label>
            <div class="text-caption">{{item.Provider_Name}}</div>
          </template>
        </v-checkbox>
      </v-list-item-content>
    </v-list-item>
    </div>
  </v-list>
  </div>
  </div>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      showPassword: false
    }
  },
  computed: {
    Password: {
      get () {
        return this.$store.getters.getPassword
      },
      set (value) {
        this.$store.dispatch('setPassword', value)
      }
    },
    Email: {
      get () {
        return this.$store.getters.getEmail
      },
      set (value) {
        this.$store.dispatch('setEmail', value)
      }
    },
    Username: {
      get () {
        return this.$store.getters.getUsername
      },
      set (value) {
        this.$store.dispatch('setUsername', value)
      }
    },
    Fullname: {
      get () {
        return this.$store.getters.getFullname
      },
      set (value) {
        this.$store.dispatch('setFullname', value)
      }
    },
    Role: {
      get () {
        return this.$store.getters.getRole
      },
      set (value) {
        this.$store.dispatch('setRole', value)
      }
    },
    ChakedHub: {
      get () {
        return this.$store.getters.getSelected
      },
      set (value) {
        this.$store.dispatch('setSelected', value)
      }
    },
    btnLoader () {
      return this.$store.state.Auth.Loaderbtn
    },
    Hubloader () {
      return this.$store.state.HubStore.load
    },
    Hubs () {
      return this.$store.state.HubStore.Hubs
    }
  },
  methods: {
    Add () {
      this.$store.dispatch('addUser')
    },
    CheckISCheck (event) {
      console.log(this.ChakedHub)
    }
  }
}
</script>
<style scoped>
.v-form{
  margin: 0 auto;
}
.v-list{
  position: relative;
  overflow-y: scroll;
  padding: 20px;
  height: 90%;
  max-height: 60vh;
  width: 100%;
}
.v-list-item{
  height: 50px;
}
div.d-flex{
height: 100%;
}
div.hub{
  width: 50%;
}
.v-list-item__title{
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%,-50%);
}
div.user{
  width: 50%;
}

</style>
