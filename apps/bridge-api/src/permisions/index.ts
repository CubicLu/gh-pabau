import { allow, rule, shield } from 'graphql-shield'
import { Context } from '../context'
import { ApolloError } from '@apollo/client'

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
      ping: allow,
    },
  },
  {
    fallbackError: async (thrownThing, parent, args, context, info) => {
      if (thrownThing instanceof ApolloError) {
        return thrownThing
      } else if (thrownThing instanceof Error) {
        // unexpected errors
        console.error(
          'What is being thrown:',
          thrownThing,
          'Context:',
          context,
          'Resolver:',
          info
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      } else {
        console.error(
          'The resolver threw something that is not an error.',
          'What is being thrown:',
          thrownThing,
          'Context:',
          context,
          'Resolver:',
          info
        )
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return new ApolloError('Internal server error', 'ERR_INTERNAL_SERVER')
      }
    },
  }
)
