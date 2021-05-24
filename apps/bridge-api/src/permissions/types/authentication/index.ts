import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Set of authentication middlewares to handle validating and injecting the current user into the graphql context
 */
export const authentication = {
  isAuthenticated: rule('isAuthenticated', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated) || 'Not Authenticated - Please login.'
  ),

  isAdmin: rule('isAdmin', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated?.admin) ||
      'Not Authorised - Please contact your company admin for more help.'
  ),

  isOwner: rule('isOwner', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated?.owner) ||
      'Not Authorised - Please contact your company owner for more help.'
  ),
}
