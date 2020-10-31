import axios from 'axios';
const URL = 'http://localhost:3333'
const api = axios.create({
    baseURL: URL,
    validateStatus: (status) => {
        return true;
      },
});
export { URL };
export default api;