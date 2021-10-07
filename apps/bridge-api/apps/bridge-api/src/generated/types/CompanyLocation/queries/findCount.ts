import { queryField, nonNull, list } from 'nexus'

export const CompanyLocationFindCountQuery = queryField(
  'findManyCompanyLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyLocationWhereInput',
      orderBy: list('CompanyLocationOrderByWithRelationInput'),
      cursor: 'CompanyLocationWhereUniqueInput',
      distinct: 'CompanyLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyLocation.count(args as any)
    },
  },
)
