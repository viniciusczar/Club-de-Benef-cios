import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3030',
})

/*api.interceptors.request.use(async config => {
    const token = getToken()
})*/

export default api;