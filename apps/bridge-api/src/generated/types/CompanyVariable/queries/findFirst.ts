import { queryField, list } from 'nexus'

export const CompanyVariableFindFirstQuery = queryField(
  'findFirstCompanyVariable',
  {
    type: 'CompanyVariable',
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByWithRelationInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyVariableScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
