import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomLocationFindCountQuery = queryField(
  'findManyCompanyRoomLocationCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      distinct: 'CompanyRoomLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomLocation.count(args as any)
    },
  },
)
