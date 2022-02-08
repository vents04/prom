const URLS = {
    PRODUCTION: {
        API: "https://api.prom.uploy.app",
        APP: "https://prom.uploy.app"
    },
    DEVELOPMENT: {
        API: "http://localhost:8083",
        APP: "http://localhost:3000"
    }
}

module.exports = {
    ROOT_URL_API: URLS.PRODUCTION.API,
    ROOT_URL_PORTAL: URLS.PRODUCTION.APP,
}