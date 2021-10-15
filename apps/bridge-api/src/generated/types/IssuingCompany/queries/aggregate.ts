import { queryField, list } from 'nexus'

export const IssuingCompanyAggregateQuery = queryField(
  'aggregateIssuingCompany',
  {
    type: 'AggregateIssuingCompany',
    args: {
      where: 'IssuingCompanyWhereInput',
      orderBy: list('IssuingCompanyOrderByInput'),
      cursor: 'IssuingCompanyWhereUniqueInput',
      distinct: 'IssuingCompanyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.issuingCompany.aggregate({ ...args, ...select }) as any
    },
  },
)
