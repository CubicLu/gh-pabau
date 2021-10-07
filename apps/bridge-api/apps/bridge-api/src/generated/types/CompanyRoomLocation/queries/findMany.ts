import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomLocationFindManyQuery = queryField(
  'findManyCompanyRoomLocation',
  {
    type: nonNull(list(nonNull('CompanyRoomLocation'))),
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByWithRelationInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      distinct: 'CompanyRoomLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.findMany({
        ...args,
        ...select,
      })
    },
  },
)
