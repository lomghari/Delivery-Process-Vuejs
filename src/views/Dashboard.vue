<template>
<div class="thisdiv">
<v-container class="pa-0" fluid v-if="User">
<v-app-bar flat class="blue-grey darken-4 grey--text text--lighten-5" app >
    <v-toolbar-title>Delivery eXpress</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn class="mr-5" depressed fab small  @click="ToPage">
        <v-icon>cloud_upload</v-icon>
    </v-btn>
    <v-menu rounded="b-xl" bottom origin="center center" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on, attrs }">
            <v-btn v-bind="attrs" v-on="on" depressed text height="100%">
                <v-icon x-large color="blue lighten-5">mdi-dots-vertical</v-icon>
            </v-btn>
        </template>
        <v-list class="pa-0" :dense="true">
            <v-list-item  @click="DoNathing">
               <v-list-item-icon>
                    <v-icon>person</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pa-0">
                    <v-list-item-title>{{User.Username}}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item  @click="DoNathing">
                 <v-list-item-icon>
                    <v-icon>home_work</v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pa-0">
                    <v-list-item-title>{{GetNameh(GetHubName)}}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
            <v-list-item v-for="(item,i) in dropList" :key="i" router :to="item.nav_route" v-show="item.showCondition" @click="item.method">
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content class="pa-0">
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-menu>
</v-app-bar>
<v-navigation-drawer v-model="drawer" width="250" height="100%" class="blue-grey lighten-4 grey--text text--lighten-5" app>
    <v-list flat>
      <v-list-item-group color="primary" class="red--text">
        <v-list-item v-for="(item,a) in navlist" :key="a + 'sos'" router :to="item.nav_route" v-show="ShowAdmistrator === false">
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <div v-if="User.Role !== 'Customer'">
        <v-list-group v-for="(item, b) in NavItem" :key="b" :prepend-icon="item.icon" v-show="ShowAdmistrator === true">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>
          <v-list-item v-for="(subItem, j) in item.items" :key="j" router :to="subItem.nav_route">
            <v-list-item-icon>
              <v-icon v-text="subItem.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
        </div>
      </v-list-item-group>
    </v-list>
</v-navigation-drawer>
   <v-main class="pa-0">
     <router-view></router-view>
   </v-main>
</v-container>
<div class="LodingSir" v-else>
   <v-progress-circular indeterminate color="deep-purple" size="150" width="10" ></v-progress-circular>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      drawer: true,
      navlist: [
        { title: 'Dashboard', icon: 'laptop_mac', nav_route: '/dashboard/home' },
        { title: 'Overview', icon: 'content_paste', nav_route: '/dashboard/overview' },
        { title: 'Pickup', icon: 'local_grocery_store', nav_route: '/dashboard/pickup' },
        { title: 'At the hub', icon: 'store_mall_directory', nav_route: '/dashboard/athub' },
        { title: 'Delivery', icon: 'airport_shuttle', nav_route: '/dashboard/delivery' },
        { title: 'Lost', icon: 'warning', nav_route: '/dashboard/lost' }
      ],
      NavItem: [
        {
          title: 'User',
          icon: 'person',
          nav_route: '/dashboard/delivery',
          items: [
            { title: 'Users', icon: 'people_alt', nav_route: '/dashboard/users' },
            { title: 'Add User', icon: 'person_add', nav_route: '/dashboard/adduser' },
            { title: 'Add Admin User', icon: 'add', nav_route: '/dashboard/adduseradmin' }
          ]
        },
        {
          title: 'Hub',
          icon: 'business',
          nav_route: '/dashboard/lost',
          items: [
            { title: 'Add Hub', icon: 'add', nav_route: '/dashboard/addhub' },
            { title: 'Manage Hub', icon: 'add', nav_route: '/dashboard/addhub' }
          ]
        }
      ],
      dropList: [
        { title: 'SwitchHub', icon: 'sync', nav_route: '/dashboard/switch', method: this.DoNathing, showCondition: true },
        { title: 'Administrator', icon: 'memory', nav_route: '', method: this.ShowAdmistratorToTrue, showCondition: !this.IfCostumer },
        { title: 'Operation', icon: 'business_center', nav_route: '', method: this.ShowAdmistratorToFalse, showCondition: !this.IfCostumer },
        { title: 'Help', icon: 'help_outline', nav_route: '', method: this.DoNathing, showCondition: true },
        { title: 'Logout', icon: 'power_settings_new', nav_route: '', method: this.Singout, showCondition: true }
      ],
      showAdmistrator: false
    }
  },
  computed: {
    User () {
      return this.$store.state.Auth.User
    },
    IfCostumer () {
      return this.$store.state.Auth.User.Role === 'Customer'
    },
    ShowAdmistrator () {
      return this.showAdmistrator
    },
    GetHubName () {
      // return this.$store.state.HubStore.Hubs.find(c => c.id === this.$store.state.Auth.User.Current_Provider).Provider_Name
      return this.$store.state.Auth.User.Current_Provider
    }
  },
  methods: {
    ToPage () {
      this.$router.replace('/dashboard/upload')
    },
    Singout () {
      this.$store.dispatch('Singout')
    },
    DoNathing () {
      return true
    },
    ShowAdmistratorToTrue () {
      this.showAdmistrator = true
    },
    ShowAdmistratorToFalse () {
      this.showAdmistrator = false
    },
    GetNameh (value) {
      return this.$store.state.HubStore.Hubs.find(c => c.id === value).Provider_Name
    }
  },
  beforeCreate () {
    this.$store.dispatch('setUser')
    this.$store.dispatch('getHubs')
  }
}
</script>
<style scoped>
.drop{
  width: 100%;
}
.LodingSir{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
.thisdiv{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
