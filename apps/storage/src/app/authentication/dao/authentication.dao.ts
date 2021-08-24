import debug from 'debug'

const log: debug.IDebugger = debug('app:authentication-dao')

class AuthenticationDao {
  constructor() {
    log('Created new instance of DeleteDao')
  }
}

export default new AuthenticationDao()
