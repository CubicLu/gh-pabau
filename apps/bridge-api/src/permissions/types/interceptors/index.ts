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
      Company: {
        in: [0, ctx.user.company],
      },
    }
    return true
  }),
  interceptAccessToCompanyData: rule('interceptAccessToCompanyData', {
    cache: 'contextual',
  })((root, args, ctx: Context, info) => {
    args.where = {
      ...args.where,
      Company: { equals: ctx.user.company },
    }
    return true
  }),
  interceptAccessToAdminTable: rule('interceptAccessToAdminTable', {
    cache: 'contextual',
  })((root, args, ctx: Context) => {
    args.where = {
      ...args.where,
      id: { equals: ctx.user.company },
    }
    return true
  }),
  interceptMutation: rule('interceptMutation', { cache: 'contextual' })(
    async (root, args, ctx, { fieldName, returnType }) => {
      if (fieldName.includes('create')) {
        args.data = {
          ...args.data,
          Company: {
            connect: { id: ctx.user.company },
          },
        }
        return true
      } else if (fieldName.includes('updateMany')) {
        args.where = {
          ...args.where,
          Company: {
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
