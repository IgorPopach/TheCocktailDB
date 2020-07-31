import { BASE_URL } from '../constants/baseUrl';

export default (url) => fetch(`${BASE_URL}/${url}`)
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.statusText)
    });