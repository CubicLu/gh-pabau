import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Set of authentication middlewares to handle validating and injecting the current user into the graphql context
 */
export const authentication = {
  isAuthenticated: rule('isAuthenticated', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated) || 'Not Authenticated'
  ),

  isAdmin: rule('isAdmin', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated?.admin) || 'Not Authorized'
  ),

  isOwner: rule('isOwner', { cache: 'no_cache' })(
    (_root, _args, ctx: Context) =>
      Boolean(ctx.authenticated?.owner) || 'Not Authorized'
  ),
  canEditProduct: rule({ cache: 'contextual' })(
    async (_root, _args, ctx: Context) => {
      const record = await ctx.prisma.staffMeta.findUnique({
        where: {
          staff_id_meta_name: {
            staff_id: ctx.authenticated.user,
            meta_name: 'can_edit_stock_level',
          },
        },
      })
      return record?.staff_id === ctx.authenticated.user
    }
  ),
}
