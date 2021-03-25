import { allow, rule, shield } from 'graphql-shield'
import { Context } from '../context'

const rules = {
  isAuthenticated: rule('isAuthenticated')(
    async (root, args, ctx: Context): Promise<boolean> => {
      try {
        if (ctx.req.authenticatedUser) return true
      } catch (error) {
        console.log(error)
        return false
      }
    }
  ),
  sameCompany: rule('sameCompany')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      try {
        console.log(info)
        if (
          info.returnType.toString().startsWith('[') ||
          info.returnType.toString() === 'Int'
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
export const permissions = shield(
  {
    Mutation: {
      login: allow,
      logout: rules.isAuthenticated,
      '*': rules.isAuthenticated && rules.interceptMutation,
    },
    Query: {
      '*': rules.isAuthenticated && rules.sameCompany,
      me: rules.isAuthenticated,
      marketingSourcesCount: rules.isAuthenticated && rules.sameCompany,
      ping: allow,
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      try {
        console.error(
          '\nThrown with args:',
          args,
          '\nResolver info :',
          info.path,
          '\nReturn type',
          info.returnType
        )
        return new Error(thrownThing.toString())
      } catch (error) {
        console.log(error)
      }
    },
  }
)
