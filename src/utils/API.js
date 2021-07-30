import axios from 'axios'

const URL = 'https://healthene-gateway-dev.intelliceed.cf/api';

export default axios.create({
    baseURL: URL,
    withCredentials: false,
    headers: {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    }
});