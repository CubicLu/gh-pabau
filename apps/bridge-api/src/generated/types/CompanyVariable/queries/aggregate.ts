import { queryField, list } from 'nexus'

export const CompanyVariableAggregateQuery = queryField(
  'aggregateCompanyVariable',
  {
    type: 'AggregateCompanyVariable',
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByWithRelationInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.aggregate({ ...args, ...select }) as any
    },
  },
)
