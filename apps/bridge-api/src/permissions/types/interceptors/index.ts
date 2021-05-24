import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Set of interceptor middlewares to handle injecting the current company into the graphql context
 */
export const interceptors = {
  interceptSharedCompanyData: rule('interceptSharedCompanyData', {
    cache: 'strict',
  })(
    async (root, args, ctx: Context): Promise<boolean> => {
      args.where = {
        ...args.where,
        company_id: {
          in: [0, ctx.authenticated.company],
        },
      }
      return true
    }
  ),
  interceptAccessToCompanyData: rule('interceptAccessToCompanyData', {
    cache: 'contextual',
  })(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      args.where = {
        ...args.where,
        company_id: { equals: ctx.authenticated.company },
      }
      return true
    }
  ),
  interceptAccessToAdminTable: rule('interceptAccessToAdminTable', {
    cache: 'contextual',
  })(
    async (root, args, ctx: Context): Promise<boolean> => {
      args.where = {
        ...args.where,
        id: { equals: ctx.authenticated.company },
      }
      return true
    }
  ),
  interceptMutation: rule('interceptMutation', { cache: 'contextual' })(
    async (root, args, ctx: Context, info): Promise<boolean> => {
      if (info?.fieldName?.includes('create')) {
        if (args.data?.Company?.connect?.id) {
          return args.data?.Company?.connect?.id === ctx?.authenticated?.company
        } else if (args?.data?.Company) {
          args.data = {
            ...args.data,
            Company: {
              connect: { id: ctx.authenticated.company },
            },
          }
          return true
        } else if (args?.data?.company) {
          throw new Error(
            'Legacy intercept detected please update your mutation'
          )
        }
        return false
      } else if (info?.fieldName?.includes('updateMany')) {
        if (args?.where?.company_id) {
          return args.where?.company_id === ctx.authenticated.company
        } else if (args.where.Company) {
          args.where = {
            ...args.where,
            Company: {
              id: { equals: ctx.authenticated.company },
            },
          }
          return true
        } else if (args?.where?.company) {
          throw new Error(
            'Legacy intercept detected please update your mutation'
          )
        }
        return false
      } else if (
        info?.fieldName?.includes('deleteOne') ||
        info?.fieldName?.includes('updateOne')
      ) {
        const returnType = info?.returnType.toString()
        const model =
          returnType?.charAt(0)?.toLowerCase() + returnType?.slice(1)
        const retrieveRow = await ctx.prisma[model].findFirst({
          ...args,
        })
        return (
          retrieveRow?.['company_id'] !== undefined &&
          retrieveRow?.['company_id'] === ctx?.authenticated?.company
        )
      }
      return false
    }
  ),
}
