import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomServiceFindCountQuery = queryField(
  'findManyCompanyRoomServiceCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      distinct: 'CompanyRoomServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoomService.count(args as any)
    },
  },
)
