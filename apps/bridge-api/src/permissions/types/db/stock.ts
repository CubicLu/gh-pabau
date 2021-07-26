import { rule } from 'graphql-shield'
import { Context } from '../../../context'

export const stock = {
  stockManager: rule()((_root, _, ctx: Context) => {
    return ctx.prisma.user
      .findUnique({
        where: {
          id: ctx.authenticated.user,
        },
      })
      .then((user) => user.stock_read_only === false)
  }),
}
