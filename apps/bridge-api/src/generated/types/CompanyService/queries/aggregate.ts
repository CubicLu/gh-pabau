import { queryField, list } from 'nexus'

export const CompanyServiceAggregateQuery = queryField(
  'aggregateCompanyService',
  {
    type: 'AggregateCompanyService',
    args: {
      where: 'CompanyServiceWhereInput',
      orderBy: list('CompanyServiceOrderByWithRelationInput'),
      cursor: 'CompanyServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyService.aggregate({ ...args, ...select }) as any
    },
  },
)
