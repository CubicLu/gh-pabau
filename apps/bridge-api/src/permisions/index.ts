import { allow, rule, shield } from 'graphql-shield'
import { Context } from "../context";

const rules = {
  isAuthenticated: rule()(async (root, args, ctx:Context): Promise<boolean> => {
    if (ctx.req.authenticatedUser){
      return true
    }
  }),
  isMarketingSourceOwnedByCompany: rule()(async (root, args, ctx:Context): Promise<boolean> => {
    const record = await ctx.prisma.marketingSource.findFirst({
      where: {
        id:args.where.id
      },
    })
    return record.company_id === ctx.req.authenticatedUser.company
  }),
  injectMarketingSources: rule()(async (root, args, ctx:Context): Promise<boolean> => {
    args.where = {
      ...args,
      company_id: ctx.req.authenticatedUser.company
    }
    return true;
  }),
}

export const permissions = shield({
  Query: {
    marketingSource: rules.isAuthenticated && rules.isMarketingSourceOwnedByCompany,
    marketingSources: rules.isAuthenticated && rules.injectMarketingSources
  },
  Mutation: {
    updateOneMarketingSource: rules.isAuthenticated && rules.isMarketingSourceOwnedByCompany,
    upsertOneMarketingSource: rules.isAuthenticated && rules.isMarketingSourceOwnedByCompany,
    deleteOneMarketingSource: rules.isAuthenticated && rules.isMarketingSourceOwnedByCompany,
    "*": rules.isAuthenticated,
    login: allow
  }

})
