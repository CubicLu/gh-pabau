export type Algorithms = {
  algorithms: string[]
}
export type jwtPayloadDtoUpload = {
  bearerToken: string
  jwtSecret: string
  algorithms: Algorithms
}

export type jwtPayloadDtoDownload = {
  jwtToken: string
  jwtSecret: string
  algorithms: Algorithms
}
