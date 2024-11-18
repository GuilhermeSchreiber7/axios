import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YTFhZDJmMDg4ZGFmMDJjNTU5ZDk3ODNjMWQzNTE1NSIsIm5iZiI6MTczMTM1MzQ4NC4yNjkzNzMyLCJzdWIiOiI2NzMyNTczMmYzZWFmYzUyMDFmZDU0YzYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZlkSHGMQBtC5tz-dWM2W1b_gfd-tKFNC2RSs5nN3HNI`,
  },
});

export default api;