<template>
  <v-container>
    <h2 class="font-weight-light text-uppercase text-h3 px-5">Upload</h2>
    <v-divider class="mt-2 mb-5"></v-divider>
    <div class="d-flex flex-wrap flex-row justify-space-between px-5">
      <h2 class="font-weight-regular">Download Template:</h2>
      <v-btn depressed class="deep-purple accent-4 blue-grey--text text--lighten-5" @click.prevent="DownloadTemplate">
         <span>Download</span>
         <v-icon right>cloud_download</v-icon>
      </v-btn>
    </div>
    <v-divider class="mt-5 mb-5"></v-divider>
    <div class="px-5 d-flex flex-column">
        <h2 class="font-weight-regular">Upload Template:</h2>
        <v-file-input  v-model="files" @change="UploadTemplate($event)" color="deep-purple accent-4" class="mt-5" counter label="File input" placeholder="Select your Template" filled prepend-icon="mdi-paperclip" accept=".xlsx , .xls"  :show-size="1000">
            <template v-slot:selection="{ index, text }">
          <v-chip v-if="index < 2" color="deep-purple accent-4" dark label small>
            {{ text }}
          </v-chip>
          <span v-else-if="index === 2" class="overline grey--text text--darken-3 mx-2">
            +{{ files.length - 2 }} File(s)
          </span>
        </template>
        </v-file-input>
      <div class="d-flex flex-row flex-wrap justify-space-around align-center">
      <div style="width:70%">
      <v-stepper :value="steps" class="mt-12">
        <v-stepper-header>
          <v-stepper-step step="1" :complete = "step1">Upload File</v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete = "step2">
            Processing
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete = "step3">Pré Envoyer</v-stepper-step>
        </v-stepper-header>
      </v-stepper>
      </div>
      <v-btn class="mt-11" @click.prevent="Send" x-large :disabled="!step2">
        <span>Send</span>
        <v-icon right>send</v-icon>
      </v-btn>
      </div>
    </div>
      <v-divider class="mt-16"></v-divider>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">UploadName</th>
           <th class="text-left">Status</th>
            <th class="text-left">Total Package</th>
            <th class="text-left">Total Package Success</th>
            <th class="text-left">Total Package Logs</th>
            <th class="text-left">LogsFile</th>
          </tr>
        </thead>
        <tbody v-if="step3">
          <tr class="py-2">
            <td>{{UploadPackage.Shipment_Provider_Id}}</td>
            <td>{{UploadPackage.Status}}</td>
            <td>{{UploadPackage.Total_Package}}</td>
            <td>{{UploadPackage.Total_Seccess_Packages}}</td>
            <td>{{UploadPackage.Total_Failer_Packages}}</td>
            <td>
              <v-btn depressed class="red" @click.prevent="DownloadLogs" :disabled="btnDes">
                <v-icon>insert_drive_file</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

  </v-container>
</template>

<script>
export default {
  data: () => ({
    files: []
  }),
  methods: {
    DownloadTemplate () {
      this.$store.dispatch('DownloadTemplate')
    },
    UploadTemplate (event) {
      if (!this.files) {
        return false
      } else {
        this.$store.dispatch('ClearUpload')
        setTimeout(() => {
          this.$store.dispatch('ProcessingData', this.files)
        }, 3000)
      }
    },
    Send () {
      this.$store.dispatch('UploadData')
    },
    DownloadLogs () {
      this.$store.dispatch('DownloadLogsFile')
    }
  },
  computed: {
    step1 () {
      return this.$store.state.PackageStore.step1
    },
    step2 () {
      return this.$store.state.PackageStore.step2
    },
    step3 () {
      return this.$store.state.PackageStore.step3
    },
    steps () {
      return this.$store.state.PackageStore.steps
    },
    UploadPackage () {
      return this.$store.state.PackageStore.UploadResponse
    },
    btnDes () {
      return this.UploadTemplate.Total_Failer_Packages === 0
    }
  },
  destroyed () {
    this.$store.dispatch('ClearUpload')
  }
}
</script>
