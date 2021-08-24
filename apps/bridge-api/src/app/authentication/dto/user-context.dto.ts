import { JwtPayloadDto } from './jwt-payload.dto'
export type UserContext = Pick<
  JwtPayloadDto,
  'user' | 'company' | 'admin' | 'owner' | 'remote_url' | 'language'
>
