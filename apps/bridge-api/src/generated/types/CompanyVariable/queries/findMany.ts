import { queryField, nonNull, list } from 'nexus'

export const CompanyVariableFindManyQuery = queryField(
  'findManyCompanyVariable',
  {
    type: nonNull(list(nonNull('CompanyVariable'))),
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      distinct: 'CompanyVariableScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.findMany({
        ...args,
        ...select,
      })
    },
  },
)
