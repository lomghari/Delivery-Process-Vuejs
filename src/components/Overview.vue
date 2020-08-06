<template>
<v-container>
  <h2 class="font-weight-light text-uppercase text-h3 px-5">Overview</h2>
  <v-divider class="my-5"></v-divider>
  <v-layout justify-center  class="pa-4">
    <v-flex xs8 class="mx-4">
      <v-text-field solo placeholder="Search" v-model="SearchQueryValue" append-icon="search" @keypress.enter="Search" @keyup="SearchLocaly"></v-text-field>
    </v-flex>
    <v-flex>
      <h3 class="font-weight-bold text-uppercase text-subtitle-1 mt-3">Par:</h3>
    </v-flex>
    <v-flex xs3 class="mx-4">
       <v-select :items="field" v-model="SearchQuery" @change="SearchLocaly" solo></v-select>
    </v-flex>
  </v-layout>
  <v-divider></v-divider>
  <v-list rounded v-if="IsHasPackages" class="SearchList">
    <v-list-item-group>
      <v-list-item v-for="(item) in items" :key="item.id" color="primary" @click="ClickItemList" :class="`super-item-${item.id}`">
          <v-list-item-content :class="`super-item-${item.id}`">
            <div :class="`d-flex super-item-${item.id}`">
              <v-list-item-title :class="`super-item-${item.id}`">{{item.Tracking_Number}}</v-list-item-title>
              <v-list-item-title :class="`super-item-${item.id}`">{{item.Referance}}</v-list-item-title>
              <v-list-item-title :class="`super-item-${item.id}`">{{item.Phone_Number}}</v-list-item-title>
            </div>
          </v-list-item-content>
       </v-list-item>
    </v-list-item-group>
  </v-list>
  <v-dialog v-model="overlay" width="70%">
    <v-tabs background-color="deep-purple accent-4" class="elevation-2" dark grow>
      <v-tabs-slider></v-tabs-slider>
      <v-tab v-for="(tab , i) in tabs" :key="i" :href="`#tab-${i}`">{{tab}}</v-tab>
      <v-tab-item v-for="(tab , i) in tabs" :key="i" :value="'tab-'+i">
        <v-card flat tile class="pa-6" v-if="tab === 'Package Info'">
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Package Create At:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.createdAt}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Traking Number:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Tracking_Number}}</v-card-subtitle>
          </div>
          <v-divider class=""></v-divider>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Reference:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Referance}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Phone:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Phone_Number}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Customer Name:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Customer_Name}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Product:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Prudoct}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Price:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Price}} DH</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">City:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.City}}</v-card-subtitle>
          </div>
          <div class="d-flex flex-row pa-3">
            <v-card-subtitle class="font-weight-bold pa-0 text-subtitle-1">Adress:</v-card-subtitle>
            <v-card-subtitle class="pa-0 pl-2 pt-1">{{selectedItemC.Address}}</v-card-subtitle>
          </div>
        </v-card>
          <v-data-table :headers="headers" :items="desserts" :items-per-page="5" class="elevation-1" v-if="tab === 'Package Hestory'"></v-data-table>
      </v-tab-item>
    </v-tabs>
  </v-dialog>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      overlay: false,
      field: ['Tracking_Number', 'Referance', 'Phone_Number'],
      tabs: ['Package Info', 'Package Hestory'],
      headers: [
        { text: 'Workflow', value: 'Package_Workflow' },
        { text: 'Status', value: 'Package_Status' },
        { text: 'Action', value: 'Package_Action' },
        { text: 'Amount To Collect', value: 'Amount_To_Collect' },
        { text: 'Hub', value: 'Shipment_Provider' },
        { text: 'Payment Method', value: 'Payment_Method' },
        { text: 'Update By', value: 'UpdateBy' }
      ],
      selectedItem: {},
      SelectedItemHestor: []
    }
  },
  computed: {
    desserts () {
      return this.SelectedItemHestor
    },
    IsHasPackages () {
      return this.$store.state.PackageStore.PackageFinder
    },
    SearchQueryValue: {
      get () {
        return this.$store.getters.getQueryToFindValue
      },
      set (value) {
        this.$store.dispatch('setQueryToFindValue', value)
      }
    },
    SearchQuery: {
      get () {
        return this.$store.getters.getQueryToFind
      },
      set (value) {
        this.$store.dispatch('setQueryToFind', value)
      }
    },
    items () {
      return this.$store.state.PackageStore.packageSearchFilter
    },
    itemsHestory () {
      return this.$store.state.PackageStore.HistoriqueBeforeProcce
    },
    selectedItemC () {
      return this.selectedItem
    }
  },
  methods: {
    Search () {
      this.$store.dispatch('SearchPackage')
    },
    ClickItemList (value) {
      this.overlay = true
      var FilterNumber = value.target.className.trim().slice(value.target.className.indexOf('super-item')).split('-')[2] * 1
      this.selectedItem = this.items.find(c => c.id === FilterNumber)
      this.SelectedItemHestor = this.itemsHestory[FilterNumber.toString()]
      console.log(this.$store.state.PackageStore.HistoriqueBeforeProcce)
    },
    SearchLocaly () {
      if (this.items) {
        // eslint-disable-next-line no-unused-expressions
        this.$store.commit('SearchPackageLocaly')
      }
    }
  }
}
</script>

<style scoped>
.v-container{
  position: relative;
}
.v-dialog{
  height: 100%;
}
.v-card,
.v-data-table{
  height: 30%;
}
.v-list.SearchList{
  height: 50vh;
  overflow-y: scroll;
}
</style>
