import { queryField, nonNull, list } from 'nexus'

export const CompanyEmailFindCountQuery = queryField(
  'findManyCompanyEmailCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyEmailWhereInput',
      orderBy: list('CompanyEmailOrderByWithRelationInput'),
      cursor: 'CompanyEmailWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyEmailScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyEmail.count(args as any)
    },
  },
)
