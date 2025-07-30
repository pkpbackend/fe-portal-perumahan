interface TLoginRes {
  expiresIn?: number 
  refreshExpiresIn?: number
  refreshToken?: string
  tokenType?: string
  sessionState?: string 
  scope?: string
  accessTokenInternal?: string 
  isLoggedIn: boolean
  resetToken?: string
}