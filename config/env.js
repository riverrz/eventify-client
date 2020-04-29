import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const {
  API_URL,
  API_GATEWAY_URL,
  CDN_URL,
  SOCKET_SERVER_URL,
} = publicRuntimeConfig;

const config = {
  apiUrl: API_URL,
  apiGatewayUrl: API_GATEWAY_URL,
  cdnUrl: CDN_URL,
  socketServerUrl: SOCKET_SERVER_URL,
};

export default config;
