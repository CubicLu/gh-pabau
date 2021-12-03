import { queryField, list } from 'nexus'

export const CompanyRoomLocationFindFirstQuery = queryField(
  'findFirstCompanyRoomLocation',
  {
    type: 'CompanyRoomLocation',
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByWithRelationInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomLocationScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
