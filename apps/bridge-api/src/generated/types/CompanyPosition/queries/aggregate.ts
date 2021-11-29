import { queryField, list } from 'nexus'

export const CompanyPositionAggregateQuery = queryField(
  'aggregateCompanyPosition',
  {
    type: 'AggregateCompanyPosition',
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByWithRelationInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.aggregate({ ...args, ...select }) as any
    },
  },
)
