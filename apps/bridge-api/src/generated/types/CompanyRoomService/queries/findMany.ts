import { queryField, nonNull, list } from 'nexus'

export const CompanyRoomServiceFindManyQuery = queryField(
  'findManyCompanyRoomService',
  {
    type: nonNull(list(nonNull('CompanyRoomService'))),
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      distinct: 'CompanyRoomServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.findMany({
        ...args,
        ...select,
      })
    },
  },
)
