<template>
  <v-container>
    <v-card class="light-blue accent-2">
          <v-list-item>
             <v-list-item-avatar  size="80" color="grey" rounded="true" width="150" height="150">
                <v-img src="https://www.premiere.fr/sites/default/files/styles/scale_crop_1280x720/public/2020-01/1235f46f7576dacf4a319ee0625be9b5.jpg" />
             </v-list-item-avatar>
             <v-list-item-content>
                <v-list-item-title>
                  <span >Welcom </span>
                  <span class="font-weight-bold text-subtitle-1">{{Username}}</span>
                </v-list-item-title>
                <v-list-item-subtitle>
                  We hope you have a very nice day at !
                </v-list-item-subtitle>
             </v-list-item-content>
          </v-list-item>

    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    Username () {
      return this.$store.state.Auth.User.Username
    }
  }
}
</script>
