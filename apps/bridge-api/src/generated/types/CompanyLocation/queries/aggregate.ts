import { queryField, list } from 'nexus'

export const CompanyLocationAggregateQuery = queryField(
  'aggregateCompanyLocation',
  {
    type: 'AggregateCompanyLocation',
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      distinct: 'CompanyLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyLocation.aggregate({ ...args, ...select }) as any
    },
  },
)