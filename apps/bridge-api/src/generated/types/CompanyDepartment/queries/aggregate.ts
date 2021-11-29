import { queryField, list } from 'nexus'

export const CompanyDepartmentAggregateQuery = queryField(
  'aggregateCompanyDepartment',
  {
    type: 'AggregateCompanyDepartment',
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByWithRelationInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.aggregate({ ...args, ...select }) as any
    },
  },
)
