import { DefaultDto } from '../dto/default.dto'

export interface DefaultInterface {
  defaultResponse: (resource: DefaultDto) => Promise<DefaultDto>
}
