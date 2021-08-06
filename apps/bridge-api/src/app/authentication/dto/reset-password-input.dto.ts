export interface ResetPasswordInputDto {
  token: string
  newPassword: string
}

export interface tokenVerificationInputDto {
  token: string
}
