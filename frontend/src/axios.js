import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8081/',
  headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
});
// http://localhost:5001/fir-9080e/us-central1/api

export default instance;
