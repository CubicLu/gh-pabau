import { queryField, list } from 'nexus'

export const CompanyLocationAggregateQuery = queryField(
  'aggregateCompanyLocation',
  {
    type: 'AggregateCompanyLocation',
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
