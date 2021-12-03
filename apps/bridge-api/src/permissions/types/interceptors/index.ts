import { GraphQLOutputType } from 'graphql'
import { rule } from 'graphql-shield'
import { Context } from '../../../context'

/**
 * Extracts the model name that can be used with prisma for data fetching from the graphql return type
 *
 * Example: return type [PaymentType!], prisma model name [paymentType]
 */
export const extractModelName = (returnType: GraphQLOutputType): string => {
  const type = returnType.toString().replace('!', '')
  return type.charAt(0).toLowerCase() + type.substr(1, type.length - 1)
}

/**
 * Set of interceptor middlewares to handle injecting the current company into the graphql context
 */
export const interceptors = {
  interceptSharedCompanyData: rule(
    'interceptSharedCompanyData',
    {}
  )((_root, args, ctx: Context, { fieldName }) => {
    fieldName.includes('findUnique')
      ? (args.where = {
          primary: {
            ...args.where,
            company_id: ctx.authenticated.company,
          },
        })
      : (args.where = {
          ...args.where,
          company_id: {
            in: [0, ctx.authenticated.company],
          },
        })
    return true
  }),
  interceptAccessToCompanyData: rule('interceptAccessToCompanyData')(
    (_root, args, ctx: Context, { fieldName }) => {
      fieldName.includes('findUnique')
        ? (args.where = {
            primary: {
              ...args.where,
              company_id: ctx.authenticated.company,
            },
          })
        : (args.where = {
            ...args.where,
            company_id: ctx.authenticated.company,
          })
      return true
    }
  ),
  interceptAccessToUserData: rule('interceptAccessToUserData')(
    (_root, args, ctx: Context, { fieldName }) => {
      fieldName.includes('findUnique')
        ? (args.where = {
            primary: {
              ...args.where,
              user_id: ctx.authenticated.user,
            },
          })
        : (args.where = {
            ...args.where,
            user_id: ctx.authenticated.user,
          })
      return true
    }
  ),
  interceptResetPasswordToken: rule('injectResetPasswordToken')(
    (_root, args, ctx: Context) => {
      if (!args?.where?.key_code) return new Error('Token not found')

      args.where = {
        key_code: args.where.key_code,
        date: {
          gte: new Date(Date.now() - 30 * 60000).toJSON(),
        },
      }
      return true
    }
  ),
  interceptAccessToAdminTable: rule('interceptAccessToAdminTable')(
    (_root, args, ctx: Context) => {
      args.where = {
        ...args.where,
        id: { equals: ctx.authenticated.company },
      }
      return true
    }
  ),
  injectUser: rule('injectUser')((_root, args, ctx: Context) => {
    if (args?.data?.User) {
      args.data = {
        ...args.data,
        User: {
          connect: { id: ctx.authenticated.user },
        },
      }
    }
    return true
  }),
  injectCompany: rule('injectCompany')(
    async (_root, args, ctx, { fieldName, returnType }) => {
      if (fieldName.includes('create')) {
        try {
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
            return new Error('Faulty mutation detected')
          }
        } catch (error) {
          return error
        }
      } else if (fieldName.includes('updateMany')) {
        try {
          args.where = {
            ...args.where,
            Company: {
              id: {
                equals: ctx.authenticated.company,
              },
            },
          }
          return true
        } catch (error) {
          return error
        }
      } else if (
        fieldName.includes('deleteOne') ||
        fieldName.includes('updateOne')
      ) {
        try {
          const record = await ctx.prisma[
            extractModelName(returnType)
          ].findFirst({
            where: {
              ...args.where,
            },
          })
          return (
            record?.company_id !== undefined &&
            record?.company_id === ctx?.authenticated?.company
          )
        } catch {
          return new Error('Not Authorized')
        }
      }
    }
  ),
  injectContact: rule('injectContact')((_root, args, ctx: Context) => {
    if (args?.data?.CmContact) {
      args.where = {
        ...args.where,
        CmContact: {
          connect: { company_id: ctx.authenticated.company },
        },
      }
    }
    return true
  }),
  injectDeletedBy: rule('injectDeletedBy')((_root, args, ctx: Context) => {
    args.data = {
      ...args.data,
      deleted_at: new Date(),
      DeletedBy: {
        connect: { id: ctx.authenticated.user },
      },
    }

    return true
  }),
}
