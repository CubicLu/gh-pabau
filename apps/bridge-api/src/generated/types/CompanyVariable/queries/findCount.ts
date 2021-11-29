import { queryField, nonNull, list } from 'nexus'

export const CompanyVariableFindCountQuery = queryField(
  'findManyCompanyVariableCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByWithRelationInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyVariableScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyVariable.count(args as any)
    },
  },
)
