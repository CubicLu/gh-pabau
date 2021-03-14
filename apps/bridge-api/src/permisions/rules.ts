import { rule } from "graphql-shield";
import { Context } from "../context";

export const rules = {
  injectCompanyId: rule()(async (root, args, ctx:Context): Promise<boolean> => {
    args.where.company_id = ctx.req.authenticatedUser.company
    return true;
  }),
  connectAuthenticatedCompany: rule()(async (root, args, ctx:Context): Promise<boolean> => {
    args.data.company.connect.id = ctx.req.authenticatedUser.company
    return true;
  })
}
