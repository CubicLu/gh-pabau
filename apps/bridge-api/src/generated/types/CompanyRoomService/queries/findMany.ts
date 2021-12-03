import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomServiceFindManyQuery = queryField(
  'findManyCompanyRoomService',
  {
    type: nonNull(list(nonNull('CompanyRoomService'))),
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CompanyRoomServiceScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.findMany({
        ...args,
        ...select,
      })
    },
  },
)
