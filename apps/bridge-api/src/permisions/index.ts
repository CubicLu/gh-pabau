import { allow, shield } from 'graphql-shield'
import { rules } from './rules'
import * as types from './types'

export const permissions = shield({
  Query: {
    "*": types.authenticated && rules.injectCompanyId,
    me: types.authenticated,
  },
  Mutation: {
    updateOneMarketingSource: types.authenticated &&  types.isMarketingSourceOwnedByCompany,
    upsertOneMarketingSource: types.authenticated &&  types.isMarketingSourceOwnedByCompany,
    deleteOneMarketingSource: types.authenticated && rules.injectCompanyId && types.isMarketingSourceOwnedByCompany,
    createOneMarketingSource: types.authenticated && rules.connectAuthenticatedCompany,
    "*": allow,
    login: allow
  }
})
