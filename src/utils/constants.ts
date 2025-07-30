const BASE_SIPRUS = {
  development: 'http://103.211.50.108:7000/api/v1/sibaru/dashboard',
  staging: 'http://103.211.50.108:7000/api/v1/sibaru/dashboard',
  prod: 'http://103.211.50.108:7000/api/v1/sibaru/dashboard',
}

const ENV = process.env.REACT_APP_BUILD_ENV || 'development'
export const SIBARU_LOGIN_URL = {
  development: 'http://localhost:3001/#/login',
  staging: 'https://sibaru.ujiaplikasi.com/sibaruv2/#/login',
  staging_perumahan: 'https://sibaru.stagingperumahan.com/sibaruv2/#/login',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaruv2/#/login',
}[ENV]

export const MIXED_BASE_URL = {
  development: 'http://localhost:8000',
  staging: 'https://sibaru.stagingperumahan.com/backend/anom',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru',
}[ENV]

export const NEW_BASE_API_URL = {
  development: 'https://sibaru.stagingperumahan.com/backend/api/new/v1',
  staging: 'https://sibaru.stagingperumahan.com/backend/api/new/v1',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/api/new/v1',
}[ENV]

export const PUBLIC_BASE_URL = {
  development: 'http://localhost:8000/',
  staging: 'https://sibaru.stagingperumahan.com/sibaru/',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/',
}[ENV]

export const BASE_API_URL = {
  development: 'http://localhost:8000/api/v1',
  staging: 'https://sibaru.stagingperumahan.com/backend/api/v1',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/api/v1',
}[ENV]

export const BASE_API_URL_V2 = {
  development: 'http://localhost:8000/api/v2',
  staging: 'https://sibaru.stagingperumahan.com/backend/api/v2',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/api/v2',
}[ENV]

export const BASE_API_URL_V3 = {
  development: 'http://localhost:8000/api/v3',
  staging: 'https://sibaru.stagingperumahan.com/backend/api/v3',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/api/v3',
}[ENV]

export const ANOM_URL = {
  development: 'https://sibaru.stagingperumahan.com/backend/anom',
  staging: 'https://sibaru.stagingperumahan.com/backend/anom',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaru/anom',
}[ENV]

export const SOCKET_URL = {
  development: 'http://localhost:8000',
  staging: 'https://sibaru.stagingperumahan.com/backend',
  prod: 'https://apisibaru.perumahan.pu.go.id/',
}[ENV]

export const BASE_API_SIPRUS = BASE_SIPRUS[ENV]
export const SIBARU_ADMIN_URL = {
  development: 'http://localhost:3001/',
  staging: 'https://sibaru.stagingperumahan.com/sibaruv2',
  prod: 'https://sibaru.perumahan.pu.go.id/sibaruv2',
}[ENV]

export const DIREKTORAT_IDS = {
  RUSUN: 1,
  RUSUS: 2,
  SWADAYA: 3,
  RUK: 4,
}

export const DIREKTORAT_COLORS = {
  RUSUN: '#A2B7F3',
  RUSUS: '#EAB630',
  RUSWA: '#9ca3af',
  RUK: '#98DDCA',
}
