import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomLocationFindCountQuery = queryField(
  'findManyCompanyRoomLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByWithRelationInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomLocation.count(args as any)
    },
  },
)
