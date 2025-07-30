// Take from .env

export const REACT_APP_NODE_ENV =
  process.env.REACT_APP_NODE_ENV || "development";
export const API_HOST = process.env.API_HOST || "http://localhost:8000";
export const REVALIDATE_TOKEN = process.env.REVALIDATE_TOKEN || "";

// Config constants based on REACT_APP_NODE_ENV

const config = {
  development: {
    JWT_SECRET_ACCESS_TOKEN: "BVslABG4yE8e9oeW5Ie7JSFIL",
    JWT_SECRET_REFRESH_TOKEN: "g0PBQfPTOnKtkkPKsMkysG1Pg",
    GA_KEY: "G-38R6E5C2WQ",
    SIRENG_CLIENT_ID: 8,
    SIRENG_BASE_URL: "https://sso-sireng.pkp.go.id",
    SIRENG_CALLBACK_URL: "http://localhost:8000/v3/sso/account/login/sireng",
  },
  staging: {
    JWT_SECRET_ACCESS_TOKEN: "BVslABG4yE8e9oeW5Ie7JSFIL",
    JWT_SECRET_REFRESH_TOKEN: "g0PBQfPTOnKtkkPKsMkysG1Pg",
    GA_KEY: "G-38R6E5C2WQ",
    SIRENG_CLIENT_ID: 8,
    SIRENG_BASE_URL: "https://sso-sireng.pkp.go.id",
    SIRENG_CALLBACK_URL:
      "https://sibaru.pkp.go.id/api/v3/sso/account/login/sireng",
  },
  prod: {
    JWT_SECRET_ACCESS_TOKEN: "2cc47254-d4d5-43c5-8227-0227f897bac0",
    JWT_SECRET_REFRESH_TOKEN: "77320f3f-a504-4fe7-9168-e6878e9c15b9",
    GA_KEY: "G-38R6E5C2WQ",
    SIRENG_CLIENT_ID: 8,
    SIRENG_BASE_URL: "https://sso-sireng.pkp.go.id",
    SIRENG_CALLBACK_URL:
      "https://sibaru.pkp.go.id/api/v3/sso/account/login/sireng",
  },
};

export const JWT_SECRET_ACCESS_TOKEN =
  config[REACT_APP_NODE_ENV].JWT_SECRET_ACCESS_TOKEN;
export const JWT_SECRET_REFRESH_TOKEN =
  config[REACT_APP_NODE_ENV].JWT_SECRET_REFRESH_TOKEN;
export const GA_KEY = config[REACT_APP_NODE_ENV].GA_KEY;
export const SIRENG_CLIENT_ID = config[REACT_APP_NODE_ENV].SIRENG_CLIENT_ID;
export const SIRENG_CLIENT_SECRET =
  config[REACT_APP_NODE_ENV].SIRENG_CLIENT_SECRET;
export const SIRENG_BASE_URL = config[REACT_APP_NODE_ENV].SIRENG_BASE_URL;
export const SIRENG_CALLBACK_URL =
  config[REACT_APP_NODE_ENV].SIRENG_CALLBACK_URL;
