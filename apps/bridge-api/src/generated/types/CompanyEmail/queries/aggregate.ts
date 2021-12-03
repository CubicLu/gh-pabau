import { queryField, list } from 'nexus'

export const CompanyEmailAggregateQuery = queryField('aggregateCompanyEmail', {
  type: 'AggregateCompanyEmail',
  args: {
    where: 'CompanyEmailWhereInput',
    orderBy: list('CompanyEmailOrderByWithRelationInput'),
    cursor: 'CompanyEmailWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyEmail.aggregate({ ...args, ...select }) as any
  },
})
