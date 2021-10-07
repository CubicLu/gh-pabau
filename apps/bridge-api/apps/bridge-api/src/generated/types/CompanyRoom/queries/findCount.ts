import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomFindCountQuery = queryField(
  'findManyCompanyRoomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CompanyRoomWhereInput',
      orderBy: list('CompanyRoomOrderByWithRelationInput'),
      cursor: 'CompanyRoomWhereUniqueInput',
      distinct: 'CompanyRoomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.companyRoom.count(args as any)
    },
  },
)
