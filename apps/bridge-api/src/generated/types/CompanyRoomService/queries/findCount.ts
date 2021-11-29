import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomServiceFindCountQuery = queryField(
  'findManyCompanyRoomServiceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomService.count(args as any)
    },
  },
)
