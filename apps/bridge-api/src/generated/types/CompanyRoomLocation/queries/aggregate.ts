import { queryField, list } from 'nexus'

export const CompanyRoomLocationAggregateQuery = queryField(
  'aggregateCompanyRoomLocation',
  {
    type: 'AggregateCompanyRoomLocation',
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      distinct: 'CompanyRoomLocationScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
