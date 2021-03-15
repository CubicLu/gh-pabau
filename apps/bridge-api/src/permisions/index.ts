import { allow, rule, shield } from 'graphql-shield'
import { Context } from '../context'
// TODO
// const companyColumns = ['occupier', 'company_id']
const rules = {
  isAuthenticated: rule('isAuthenticated')(
    (root, args, ctx: Context): boolean => {
      if (!ctx.req.authenticatedUser) throw new Error('Please login!')
      return true
    }
  ),
  sameCompany: rule('sameCompany')(
    (root, args, ctx: Context, info): boolean => {
      if (root && root.company_id !== ctx.req.authenticatedUser.company){
        return false
      }
      if (info.returnType.toString().startsWith('['))
        args.where = {
          ...args.where,
          company_id: { equals: ctx.req.authenticatedUser.company },
        }
      return true
    }
  ),
  connectAuthenticatedCompany: rule()( (root, args, ctx:Context): boolean => {
    args.data.company.connect.id = ctx.req.authenticatedUser.company
    return true;
  }),
  injectCompanyId: rule()( (root, args, ctx:Context): boolean => {
    args.where.company_id = ctx.req.authenticatedUser.company
    return true;
  }),
}
export const permissions = shield(
  {
    Mutation: {
      login: allow
    },
  },
  {
    fallbackRule: rules.isAuthenticated && rules.sameCompany,
    fallbackError:
      'You are not authorised to view this resource. Please login as the correct user.',
  }
)
