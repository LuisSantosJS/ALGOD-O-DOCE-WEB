import axios from 'axios';
const UPLOAD_URL = 'https://api-upload-algo-doce.herokuapp.com'
const upload = axios.create({
    baseURL: UPLOAD_URL,
    validateStatus: (status) => {
        return true;
      },
});
export { UPLOAD_URL };
export default upload;