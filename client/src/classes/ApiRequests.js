const axios = require('axios');

const { ROOT_URL_API } = require('../global');

const ApiRequests = {
    get: (path, headers) => {
        return axios.get(
            `${ROOT_URL_API}/${path}`,
            {
                headers: headers,
            }
        )
    },

    post: (path, headers, payload) => {
        return axios.post(
            `${ROOT_URL_API}/${path}`,
            payload,
            {
                headers: headers,
            }
        )
    },

    put: (path, headers, payload) => {
        return axios.put(
            `${ROOT_URL_API}/${path}`,
            payload,
            {
                headers: headers
            }
        )
    },

    delete: (path, headers) => {
        return axios.delete(
            `${ROOT_URL_API}/${path}`,
            {
                headers: headers
            }
        )
    },
}

export default ApiRequests;