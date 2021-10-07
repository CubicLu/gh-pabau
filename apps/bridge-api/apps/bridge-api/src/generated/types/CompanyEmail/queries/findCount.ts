import { queryField, nonNull, list } from 'nexus'

export const CompanyEmailFindCountQuery = queryField(
  'findManyCompanyEmailCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyEmailWhereInput',
      orderBy: list('CompanyEmailOrderByWithRelationInput'),
      cursor: 'CompanyEmailWhereUniqueInput',
      distinct: 'CompanyEmailScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyEmail.count(args as any)
    },
  },
)
