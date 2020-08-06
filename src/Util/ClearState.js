export const ClearInputHub = (state) => {
  state.HubName = ''
  state.HubLocation = ''
  state.HubCity = ''
  state.HubPhone = ''
}

export const ClearInputLogin = (state) => {
  state.email = ''
  state.password = ''
}

export const ClearInputSingin = (state) => {
  state.email = ''
  state.username = ''
  state.password = ''
  state.role = ''
  state.fullname = ''
}

export const ClearInputUpload = (state) => {
  state.step1 = false
  state.step2 = false
  state.step3 = false
  state.steps = 1
  state.PackageDataToSend = null
  state.UploadResponse = null
  state.LogsData = null
}
