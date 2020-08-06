<template>
 <v-container class="blue-grey lighten-5 pa-6 rounded-t-xl">
   <nav class="blue-grey darken-4 px-6 grey--text text--lighten-5 py-3 mb-6 rounded">
     <v-layout row justify-space-around align-center>
       <v-flex xs6>
         <h1 class="text-subtitle-1">Delivery eXpress</h1>
        </v-flex>
       <v-flex xs6 class="text-end">
         <h5 class="text-uppercase">Singup</h5>
         </v-flex>
     </v-layout>
   </nav>
   <v-form>
     <v-text-field label="Username"  prepend-icon="account_circle" v-model="Username">
     </v-text-field>
     <v-text-field label="Email"  prepend-icon="email" v-model="Email">
     </v-text-field>
     <v-text-field label="Password"  prepend-icon="vpn_key" v-model="Password" :type="showPassword? 'text':'password'"  :append-icon="showPassword? 'visibility':'visibility_off'" @click:append="showPassword=!showPassword">
     </v-text-field>
     <v-text-field label="Fullname"  prepend-icon="business" v-model="Fullname">
     </v-text-field>
     <v-select :items="roles" label="Role" prepend-icon="portrait" v-model="Role"></v-select>
         <v-layout>
           <v-flex>
             <a href="#" class="text-caption">Informations de compte oubliées ?</a>
           </v-flex>
         </v-layout>
          <v-divider class="my-5"></v-divider>
     <v-btn depressed class="primary d-block" large width="100%" :loading="btnLoader" @click.prevent="Singup">
        <span>Singup</span>
     </v-btn>
   </v-form>
   </v-container>
</template>

<script>
export default {
  data () {
    return {
      showPassword: false,
      roles: ['Customer', 'Admin', 'Operateur', 'Manager', 'Rider']
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
    btnLoader () {
      return this.$store.state.Auth.Loaderbtn
    }
  },
  methods: {
    Singup () {
      this.$store.dispatch('singUp')
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
