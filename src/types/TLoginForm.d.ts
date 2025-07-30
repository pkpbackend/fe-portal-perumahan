interface TLoginForm {
  username: string
  password: string 
}
interface TLoginDeveloperForm {
  email: string
}
interface TVerifyLoginOTPDeveloper {
  email: string
  otp: string
}
interface TLupaPasswordForm {
  email: string
}

interface TLupaPasswordTokenForm {
  token: string,
  newPassword: string,
  confirmPassword: string,
}