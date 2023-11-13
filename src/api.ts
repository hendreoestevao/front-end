import axios from 'axios'

const urlPath = window.location.hostname === 'localhost' ? 'http://localhost:3000/' : 'https://biz24mctej.us-east-1.awsapprunner.com/api/'

const api = axios.create({
  baseURL: `${urlPath}`,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'multipart/form-data',
    Authorization: `${localStorage.getItem('JWT_TOKEN') ?? ''}`
  }
})

export default api
