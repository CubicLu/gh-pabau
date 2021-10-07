import { queryField, nonNull, list } from 'nexus'

export const CompanyVariableFindCountQuery = queryField(
  'findManyCompanyVariableCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyVariableWhereInput',
      orderBy: list('CompanyVariableOrderByWithRelationInput'),
      cursor: 'CompanyVariableWhereUniqueInput',
      distinct: 'CompanyVariableScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyVariable.count(args as any)
    },
  },
)
