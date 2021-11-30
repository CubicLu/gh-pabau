import { queryField, list } from 'nexus'

export const CompanyRoomServiceAggregateQuery = queryField(
  'aggregateCompanyRoomService',
  {
    type: 'AggregateCompanyRoomService',
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByWithRelationInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.aggregate({ ...args, ...select }) as any
    },
  },
)
