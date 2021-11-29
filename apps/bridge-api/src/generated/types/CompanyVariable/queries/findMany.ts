import { queryField, nonNull, list } from 'nexus'

export const CompanyVariableFindManyQuery = queryField(
  'findManyCompanyVariable',
  {
    type: nonNull(list(nonNull('CompanyVariable'))),
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByWithRelationInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyVariableScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyVariable.findMany({
        ...args,
        ...select,
      })
    },
  },
)
