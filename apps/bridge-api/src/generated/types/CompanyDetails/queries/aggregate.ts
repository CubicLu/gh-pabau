import { queryField, list } from 'nexus'

export const CompanyDetailsAggregateQuery = queryField(
  'aggregateCompanyDetails',
  {
    type: 'AggregateCompanyDetails',
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByWithRelationInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.aggregate({ ...args, ...select }) as any
    },
  },
)
