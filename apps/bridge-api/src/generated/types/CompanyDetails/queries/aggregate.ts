import { queryField, list } from 'nexus'

export const CompanyDetailsAggregateQuery = queryField(
  'aggregateCompanyDetails',
  {
    type: 'AggregateCompanyDetails',
    args: {
      where: 'CompanyDetailsWhereInput',
      orderBy: list('CompanyDetailsOrderByInput'),
      cursor: 'CompanyDetailsWhereUniqueInput',
      distinct: 'CompanyDetailsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyDetails.aggregate({ ...args, ...select }) as any
    },
  },
)
