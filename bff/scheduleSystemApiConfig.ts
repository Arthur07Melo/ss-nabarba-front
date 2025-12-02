import axios from 'axios';

const apiBackend = axios.create({
  baseURL: 'http://localhost:3000'
})

export default apiBackend;