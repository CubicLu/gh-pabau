import { queryField, list } from 'nexus'

export const CompanyLogAggregateQuery = queryField('aggregateCompanyLog', {
  type: 'AggregateCompanyLog',
  args: {
    where: 'CompanyLogWhereInput',
    orderBy: list('CompanyLogOrderByWithRelationInput'),
    cursor: 'CompanyLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyLog.aggregate({ ...args, ...select }) as any
  },
})
