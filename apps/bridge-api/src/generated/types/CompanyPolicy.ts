import { objectType, arg, extendType } from 'nexus'

export const CompanyPolicy = objectType({
  name: 'CompanyPolicy',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.privacy_policy()
    t.model.Company()
  },
})

export const companyPolicyQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyPolicy()
    t.field('findFirstCompanyPolicy', {
      type: 'CompanyPolicy',
      args: {
        where: 'CompanyPolicyWhereInput',
        orderBy: arg({ type: 'CompanyPolicyOrderByInput' }),
        cursor: 'CompanyPolicyWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPolicy.findFirst(args as any)
      },
    })
    t.crud.companyPolicies({ filtering: true, ordering: true })
    t.field('companyPoliciesCount', {
      type: 'Int',
      args: {
        where: 'CompanyPolicyWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPolicy.count(args as any)
      },
    })
  },
})

export const companyPolicyMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyPolicy()
    t.crud.updateOneCompanyPolicy()
    t.crud.upsertOneCompanyPolicy()
    t.crud.deleteOneCompanyPolicy()
    t.crud.updateManyCompanyPolicy()
  },
})
