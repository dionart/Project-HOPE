import {create} from 'apisauce';
import axios from 'axios'

//ip para conexão entre api e mobile
const customAxiosInstance = axios.create({ baseURL: 'http://192.168.1.9:3333' })

const api = create({
    axiosInstance: customAxiosInstance
});

if(api.ok) console.log('OK!');

api.addResponseTransform(response => {
    if(!response.ok) throw response;
});

export default api;