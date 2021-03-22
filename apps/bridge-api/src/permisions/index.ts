import { allow, rule, shield } from 'graphql-shield'
import { Context } from '../context'

// TODO
// const companyColumns = ['occupier', 'company_id']

const rules = {
  isAuthenticated: rule('isAuthenticated')(
    async (root, args, ctx: Context): Promise<boolean> => {
      console.log(ctx.req.authenticatedUser)
      if (ctx.req.authenticatedUser) return true
    }
  ),
  sameCompany: rule('sameCompany')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
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
        console.error(error)
      }
    }
  ),
  interceptMutation: rule('interceptMutation')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      try {
        if (
          info.operation.name.value.includes('add') &&
          !args.data?.company?.connect?.id
        ) {
          args.data = {
            ...args.data,
            company: { connect: { id: ctx.req.authenticatedUser.company } },
          }
        }
        return true
      } catch (error) {
        console.error(error)
      }
    }
  ),
}
export const permissions = shield({
  Mutation: {
    login: allow,
    logout: rules.isAuthenticated,
    '*': rules.isAuthenticated && rules.interceptMutation,
  },
  Query: {
    '*': rules.isAuthenticated && rules.sameCompany,
    marketingSourcesCount: rules.isAuthenticated && rules.sameCompany,
    me: rules.isAuthenticated,
  },
})
