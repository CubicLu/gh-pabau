import { queryField, nonNull, list } from 'nexus'

export const CompanyLocationFindCountQuery = queryField(
  'findManyCompanyLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLocation.count(args as any)
    },
  },
)
