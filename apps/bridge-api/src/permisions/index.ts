import { allow, rule, shield } from 'graphql-shield'
import { Context } from "../context";

const rules = {
  isAuthenticated: rule()(async (_, args, ctx:Context): Promise<boolean> => {
    if (ctx.req.authenticatedUser){
      return true
    }
  }),
}

export const permissions = shield({
  Query: rules.isAuthenticated,
  Mutation: {
    "*": rules.isAuthenticated,
    login: allow
  }

})
