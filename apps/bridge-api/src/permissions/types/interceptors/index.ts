import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Set of interceptor middlewares to handle injecting the current company into the graphql context
 */
export const interceptors = {
  interceptSharedCompanyData: rule('interceptSharedCompanyData', {
    cache: 'strict',
  })((root, args, ctx: Context) => {
    args.where = {
      ...args.where,
      company_id: {
        in: [0, ctx.authenticated.company],
      },
    }
    return true
  }),
  interceptAccessToCompanyData: rule('interceptAccessToCompanyData')(
    (root, args, ctx: Context, info) => {
      args.where = {
        ...args.where,
        company_id: { equals: ctx.authenticated.company },
      }
      return true
    }
  ),
  interceptAccessToAdminTable: rule('interceptAccessToAdminTable', {
    cache: 'contextual',
  })((root, args, ctx: Context) => {
    args.where = {
      ...args.where,
      id: { equals: ctx.authenticated.company },
    }
    return true
  }),
  interceptMutation: rule('interceptMutation', { cache: 'contextual' })(
    async (root, args, ctx, { fieldName, returnType }) => {
      if (fieldName.includes('create')) {
        if (args.data?.company?.connect?.id) {
          return args.data.company.connect?.id === ctx.authenticated.company
        } else if (args.data?.Company?.connect?.id) {
          return args.data.Company.connect.id === ctx.authenticated.company
        } else if (args.data.company) {
          args.data = {
            ...args.data,
            company: {
              connect: { id: ctx.authenticated.company },
            },
          }
          return true
        } else if (args.data.Company) {
          args.data = {
            ...args.data,
            Company: {
              connect: { id: ctx.authenticated.company },
            },
          }
          return true
        } else {
          throw new Error('Faulty mutation detected')
        }
      } else if (fieldName.includes('updateMany')) {
        args.where = {
          ...args.where,
          company_id: {
            id: { equals: ctx.user.company },
          },
        }
        return true
      } else if (
        fieldName.includes('deleteOne') ||
        fieldName.includes('updateOne')
      ) {
        const model =
          returnType.toString().charAt(0)?.toLowerCase() +
          returnType.toString().slice(1)
        const retrieveRow = await ctx.prisma[model].findFirst({
          where: {
            ...args.where,
          },
        })
        console.log(retrieveRow)
        return (
          retrieveRow?.['company_id'] !== undefined &&
          retrieveRow?.['company_id'] === ctx?.authenticated?.company
        )
      }
      return false
    }
  ),
}
