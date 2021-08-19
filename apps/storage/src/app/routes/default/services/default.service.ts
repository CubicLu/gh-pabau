import DefaultDao from '../dao/default.dao'
import { DefaultInterface } from '../interfaces/default.interface'
import { DefaultDto } from '../dto/default.dto'

class DefaultService implements DefaultInterface {
  async defaultResponse(resource: DefaultDto) {
    return DefaultDao.defaultResponse(resource)
  }
}

export default new DefaultService()
