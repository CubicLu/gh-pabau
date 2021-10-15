import { queryField, list } from 'nexus'

export const CompanyRoomServiceAggregateQuery = queryField(
  'aggregateCompanyRoomService',
  {
    type: 'AggregateCompanyRoomService',
    args: {
      where: 'CompanyRoomServiceWhereInput',
      orderBy: list('CompanyRoomServiceOrderByInput'),
      cursor: 'CompanyRoomServiceWhereUniqueInput',
      distinct: 'CompanyRoomServiceScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomService.aggregate({ ...args, ...select }) as any
    },
  },
)
