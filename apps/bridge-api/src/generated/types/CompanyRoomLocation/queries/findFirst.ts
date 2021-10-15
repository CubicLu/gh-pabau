import { queryField, list } from 'nexus'

export const CompanyRoomLocationFindFirstQuery = queryField(
  'findFirstCompanyRoomLocation',
  {
    type: 'CompanyRoomLocation',
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      distinct: 'CompanyRoomLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
