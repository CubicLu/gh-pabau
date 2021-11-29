import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomFindCountQuery = queryField(
  'findManyCompanyRoomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomWhereInput',
      orderBy: list('CompanyRoomOrderByWithRelationInput'),
      cursor: 'CompanyRoomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoom.count(args as any)
    },
  },
)
