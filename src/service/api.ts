import axios from 'axios';
const URL = 'https://api-algo-doce.herokuapp.com'
const api = axios.create({
    baseURL: URL,
    validateStatus: (status) => {
        return true;
      },
});
export { URL };
export default api;