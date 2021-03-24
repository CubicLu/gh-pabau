import { rule } from 'graphql-shield'
import { Context } from '../../../context'

export const authenticated = rule({ cache: 'contextual' })(
  async (root, args, ctx: Context): Promise<boolean> => {
    if (ctx.req.authenticatedUser) {
      return true
    }
  }
)
