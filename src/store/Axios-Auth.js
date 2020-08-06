import Axios from 'axios'

const AxiosInstance = Axios.create({
  // baseURL: 'http://127.0.0.1:8000/api/v1'
  baseURL: 'https://cors-anywhere.herokuapp.com/https://e-delevri.herokuapp.com/api/v1'
})

export default AxiosInstance
