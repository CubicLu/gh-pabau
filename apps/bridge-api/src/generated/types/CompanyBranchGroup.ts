import { objectType, arg, extendType } from 'nexus'

export const CompanyBranchGroup = objectType({
  name: 'CompanyBranchGroup',
  definition(t) {
    t.model.id()
    t.model.name()
    t.model.shared_data()
    t.model.company_id()
    t.model.Company()
    t.model.CompanyBranch()
  },
})

export const companyBranchGroupQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyBranchGroup()
    t.field('findFirstCompanyBranchGroup', {
      type: 'CompanyBranchGroup',
      args: {
        where: 'CompanyBranchGroupWhereInput',
        orderBy: arg({ type: 'CompanyBranchGroupOrderByInput' }),
        cursor: 'CompanyBranchGroupWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranchGroup.findFirst(args as any)
      },
    })
    t.crud.companyBranchGroups({ filtering: true, ordering: true })
    t.field('companyBranchGroupsCount', {
      type: 'Int',
      args: {
        where: 'CompanyBranchGroupWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyBranchGroup.count(args as any)
      },
    })
  },
})

export const companyBranchGroupMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyBranchGroup()
    t.crud.updateOneCompanyBranchGroup()
    t.crud.upsertOneCompanyBranchGroup()
    t.crud.deleteOneCompanyBranchGroup()
    t.crud.updateManyCompanyBranchGroup()
  },
})
