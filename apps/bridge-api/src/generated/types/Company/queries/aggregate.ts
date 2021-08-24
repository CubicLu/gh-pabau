import { queryField, list } from 'nexus'

export const CompanyAggregateQuery = queryField('aggregateCompany', {
  type: 'AggregateCompany',
  args: {
    where: 'CompanyWhereInput',
    orderBy: list('CompanyOrderByInput'),
    cursor: 'CompanyWhereUniqueInput',
    distinct: 'CompanyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.company.aggregate({ ...args, ...select }) as any
  },
})
