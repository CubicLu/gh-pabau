import { queryField, list } from 'nexus'

export const CompanyVariableAggregateQuery = queryField(
  'aggregateCompanyVariable',
  {
    type: 'AggregateCompanyVariable',
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      distinct: 'CompanyVariableScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.aggregate({ ...args, ...select }) as any
    },
  },
)
