export interface AuthenticationInterface {
  extractJwt: (bearerToken: string) => Promise<string>
  getBearerToken: (authenticationHeader: string) => Promise<string>
  checkJwt: (bearerToken: string) => Promise<string | unknown>
}
