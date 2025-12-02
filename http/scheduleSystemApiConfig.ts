import axios from 'axios';

const apiBFF = axios.create({
  baseURL: 'http://localhost:3001'
})

export default apiBFF;