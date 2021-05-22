import { rule } from 'graphql-shield'
import { Context } from '../../../context'

export const authenticated = rule({ cache: 'contextual' })(
  async (root, args, ctx: Context): Promise<boolean> => {
    if (ctx.user) {
      return true
    }
  }
)
