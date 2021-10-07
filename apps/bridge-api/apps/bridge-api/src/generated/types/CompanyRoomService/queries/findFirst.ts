import { queryField, list } from 'nexus'

export const CompanyRoomServiceFindFirstQuery = queryField(
  'findFirstCompanyRoomService',
  {
    type: 'CompanyRoomService',
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      distinct: 'CompanyRoomServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
