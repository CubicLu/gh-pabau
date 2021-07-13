import { queryField, list } from 'nexus'

export const CompanyPositionAggregateQuery = queryField(
  'aggregateCompanyPosition',
  {
    type: 'AggregateCompanyPosition',
    args: {
      where: 'CompanyPositionWhereInput',
      orderBy: list('CompanyPositionOrderByInput'),
      cursor: 'CompanyPositionWhereUniqueInput',
      distinct: 'CompanyPositionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyPosition.aggregate({ ...args, ...select }) as any
    },
  },
)
