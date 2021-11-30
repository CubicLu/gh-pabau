import { queryField, list } from 'nexus'

export const CompanyRoomServiceFindFirstQuery = queryField(
  'findFirstCompanyRoomService',
  {
    type: 'CompanyRoomService',
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
