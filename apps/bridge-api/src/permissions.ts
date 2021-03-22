import { allow, rule, shield } from 'graphql-shield'
import { Context } from './context'

// TODO
// const companyColumns = ['occupier', 'company_id']

const rules = {
  isAuthenticated: rule('isAuthenticated')(
    async (root, args, ctx: Context): Promise<boolean> => {
      console.log('isAuthenticated', !!ctx.user)
      if (ctx.user) return true
    }
  ),
  sameCompany: rule('sameCompany')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      try {
        console.log(
          'sameCompany',
          ctx.user,
          !!(root && root.company_id !== ctx.user.company),
          info.operation
        )

        if (!ctx.user || (root && root.company_id !== ctx.user.company))
          return false
        if (
          info.returnType.toString().startsWith('[') ||
          info.operation.name?.value.includes('aggregate')
        )
          args.where = {
            ...args.where,
            company_id: { equals: ctx.user.company },
          }
        console.log('allowed')
        return true
      } catch (error) {
        console.log(error)
      }
    }
  ),
  interceptMutation: rule('interceptMutation')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      if (!ctx.user) return false
      try {
        if (
          info.operation.name.value.includes('add') &&
          !args.data?.company?.connect?.id
        ) {
          args.data = {
            ...args.data,
            company: { connect: { id: ctx.user.company } },
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
    //'*': rules.isAuthenticated && rules.interceptMutation,
  },
  Query: {
    marketingSourcesCount: rules.isAuthenticated && rules.sameCompany,
    me: rules.isAuthenticated,
    ping: allow,
    '*': rules.isAuthenticated && rules.sameCompany,
  },
})
