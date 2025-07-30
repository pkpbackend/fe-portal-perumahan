import axios from 'axios'
import { API_HOST } from '@config/envy'

export const useApiV3 = () => {

  const apiV3 = axios.create({ 
    baseURL: `${API_HOST}/v3` 
  })
  
  apiV3.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(typeof window !== 'undefined') {
      if (localStorage?.accessTokenInternal) {
        const token = localStorage.accessTokenInternal
        config.headers.Authorization = 'Bearer ' + token
        return config
      }
    }
   
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })
  
  apiV3.interceptors.response.use(function (response) {
    // Do something with response data
    // response.data = (response.data).data
    return response
  }, function (error) {
    // Do something with response error
    return Promise.reject(error)
  })

  return apiV3
}