import { queryField, list } from 'nexus'

export const CompanyVariableFindFirstQuery = queryField(
  'findFirstCompanyVariable',
  {
    type: 'CompanyVariable',
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      distinct: 'CompanyVariableScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
