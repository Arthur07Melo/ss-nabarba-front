import axios from 'axios';

const apiBFF = axios.create({
  baseURL: 'http://localhost:3000'
})

export default apiBFF;