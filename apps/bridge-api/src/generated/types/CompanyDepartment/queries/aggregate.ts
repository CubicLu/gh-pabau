import { queryField, list } from 'nexus'

export const CompanyDepartmentAggregateQuery = queryField(
  'aggregateCompanyDepartment',
  {
    type: 'AggregateCompanyDepartment',
    args: {
      where: 'CompanyDepartmentWhereInput',
      orderBy: list('CompanyDepartmentOrderByInput'),
      cursor: 'CompanyDepartmentWhereUniqueInput',
      distinct: 'CompanyDepartmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDepartment.aggregate({ ...args, ...select }) as any
    },
  },
)
