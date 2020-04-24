require("dotenv").config();

module.exports = {
  publicRuntimeConfig: {
    API_URL: process.env.API_URL,
    API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    CDN_URL: process.env.CDN_URL,
    SOCKET_SERVER_URL: process.env.SOCKET_SERVER_URL,
  },
};
