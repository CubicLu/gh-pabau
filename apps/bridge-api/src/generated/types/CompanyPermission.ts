import { objectType, arg, extendType } from 'nexus'

export const CompanyPermission = objectType({
  name: 'CompanyPermission',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.section()
    t.model.Company()
    t.model.Page()
  },
})

export const companyPermissionQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyPermission()
    t.field('findFirstCompanyPermission', {
      type: 'CompanyPermission',
      args: {
        where: 'CompanyPermissionWhereInput',
        orderBy: arg({ type: 'CompanyPermissionOrderByInput' }),
        cursor: 'CompanyPermissionWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPermission.findFirst(args as any)
      },
    })
    t.crud.companyPermissions({ filtering: true, ordering: true })
    t.field('companyPermissionsCount', {
      type: 'Int',
      args: {
        where: 'CompanyPermissionWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyPermission.count(args as any)
      },
    })
  },
})

export const companyPermissionMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyPermission()
    t.crud.updateOneCompanyPermission()
    t.crud.upsertOneCompanyPermission()
    t.crud.deleteOneCompanyPermission()
  },
})
