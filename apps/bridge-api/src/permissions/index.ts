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
  belongsToCompanyAndShared: rule('belongsToCompanyAndShared')(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      try {
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
  belongsToCompany: rule('belongsToCompany')(
    async (root, args, ctx: Context): Promise<boolean> => {
      try {
        args.where = {
          ...args.where,
          id: { equals: ctx.req.authenticatedUser.company },
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
          if (args.data.company) {
            args.data = {
              ...args.data,
              company: {
                connect: { id: ctx.req.authenticatedUser.company },
              },
            }
          } else if (args.data.Company) {
            args.data = {
              ...args.data,
              Company: {
                connect: { id: ctx.req.authenticatedUser.company },
              },
            }
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
    me: rules.isAuthenticated,
    reportCategories: rules.isAuthenticated,
    userMainPermissions: rules.isAuthenticated,
    userAlerts: rules.isAuthenticated,
    userAlertTypes: rules.isAuthenticated,
    socialSurveyAnswers: rules.isAuthenticated,
    userAlertPermissions: rules.isAuthenticated && rules.belongsToCompany,
    companies: rules.isAuthenticated && rules.belongsToCompany,
    ping: allow,
    '*': rules.isAuthenticated,
  },
})
