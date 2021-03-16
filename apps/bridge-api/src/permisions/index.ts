import { allow, rule, shield } from 'graphql-shield'
import { Context } from '../context'

// TODO
// const companyColumns = ['occupier', 'company_id']

const rules = {
  isAuthenticated: rule('isAuthenticated')(
    async (root, args, ctx: Context): Promise<boolean> => {
      if (ctx.req.authenticatedUser) return true
    }
  ),
  sameCompany: rule('sameCompany')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      if (!ctx.req.authenticatedUser) return false
      try {
        if (root && root.company_id !== ctx.req.authenticatedUser.company)
          return false
        if (
          info.returnType.toString().startsWith('[') ||
          info.operation.name.value.includes('aggregate')
        )
          args.where = {
            ...args.where,
            company_id: { equals: ctx.req.authenticatedUser.company },
          }
        return true
      } catch (error) {
        console.log(error)
      }
    }
  ),
  interceptMutation: rule('interceptMutation')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      console.log('interceptMutation')
      console.log('args', args)
      if (args?.where?.id) {
        try {
          const record = await ctx.prisma.marketingSource.findUnique({
            rejectOnNotFound: false,
            where: {
              id: args?.where?.id,
            },
          })
          console.log('done')
          if (record.company_id !== ctx.req.authenticatedUser.company)
            return false
        } catch (error) {
          console.error(error)
        }
      }
      args.data = {
        ...args.data,
        company: { connect: { id: ctx.req.authenticatedUser.company } },
      }
      console.log('returning')
      return true
    }
  ),
}
export const permissions = shield({
  Mutation: {
    login: allow,
    logout: rules.isAuthenticated,
    '*': rules.interceptMutation,
  },
  Query: {
    '*': rules.isAuthenticated && rules.sameCompany,
    marketingSourcesCount: rules.isAuthenticated && rules.sameCompany,
    me: rules.isAuthenticated,
  },
})
