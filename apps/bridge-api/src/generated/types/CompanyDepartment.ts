import { objectType, arg, extendType } from 'nexus'

export const CompanyDepartment = objectType({
  name: 'CompanyDepartment',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.department()
    t.model.Company()
  },
})

export const companyDepartmentQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyDepartment()
    t.field('findFirstCompanyDepartment', {
      type: 'CompanyDepartment',
      args: {
        where: 'CompanyDepartmentWhereInput',
        orderBy: arg({ type: 'CompanyDepartmentOrderByInput' }),
        cursor: 'CompanyDepartmentWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyDepartment.findFirst(args as any)
      },
    })
    t.crud.companyDepartments({ filtering: true, ordering: true })
    t.field('companyDepartmentsCount', {
      type: 'Int',
      args: {
        where: 'CompanyDepartmentWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyDepartment.count(args as any)
      },
    })
  },
})

export const companyDepartmentMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyDepartment()
    t.crud.updateOneCompanyDepartment()
    t.crud.upsertOneCompanyDepartment()
    t.crud.deleteOneCompanyDepartment()
    t.crud.updateManyCompanyDepartment()
    t.crud.deleteManyCompanyDepartment()
  },
})
