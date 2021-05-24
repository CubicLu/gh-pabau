import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Set of authentication middlewares to handle validating and injecting the current user into the graphql context
 */
export const authentication = {
  isAuthenticated: rule('isAuthenticated', { cache: 'no_cache' })(
    async (root, args, ctx: Context): Promise<boolean> => {
      return !!ctx?.authenticated?.user
    }
  ),
  isAdmin: rule('isAdmin', { cache: 'no_cache' })(
    async (root, args, ctx: Context): Promise<boolean> => {
      return ctx?.authenticated?.admin === true ?? false
    }
  ),
  isOwner: rule('isOwner', { cache: 'no_cache' })(
    async (root, args, ctx: Context): Promise<boolean> => {
      return ctx?.authenticated?.owner === true ?? false
    }
  ),
}
