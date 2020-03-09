import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const config = {
  apiUrl: API_URL
};

export default config;
