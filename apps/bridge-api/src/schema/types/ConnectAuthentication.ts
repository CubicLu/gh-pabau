import { extendType, intArg, nonNull, stringArg } from 'nexus'
import { Context } from '../../context'
import { ConnectCredentials } from '../../app/authentication/connect/interfaces/ConnectCredentials'
import ConnectAuthenticationService from '../../app/authentication/connect/ConnectAuthenticationService'
import { JwtPayloadDto } from '../../app/authentication/dto'

export const ConnectAuthentication = extendType({
  type: 'Mutation',
  definition(t) {
    t.field('ConnectVerifyCredentials', {
      type: 'UserMaster',
      args: {
        username: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(_, loginInput: ConnectCredentials, ctx: Context) {
        if (!loginInput.username || !loginInput.password) {
          throw new Error('Malformed Parameters')
        }

        const authService = new ConnectAuthenticationService(ctx)
        return await authService.findUser(loginInput)
      },
    })
    t.field('ConnectAuthorizeUser', {
      type: 'String',
      args: {
        contact_id: nonNull(intArg()),
        company_id: nonNull(intArg()),
      },
      async resolve(_, args, ctx: Context) {
        const authService = new ConnectAuthenticationService(ctx)
        return authService.generateJWT(args.contact_id, args.company_id)
      },
    })
    t.field('logout', {
      type: 'Boolean',
      args: {},
      async resolve(_, __) {
        return true
      },
    })
    t.field('ConnectGetJWTClient', {
      type: 'UserMaster',
      args: {
        jwt: nonNull(stringArg()),
      },
      async resolve(_, args, ctx: Context) {
        const authService = new ConnectAuthenticationService(ctx)
        const decodedJWT: JwtPayloadDto = authService.decodeJWT(args.jwt)
        return authService.findUserById(decodedJWT.user)
      },
    })
  },
})
