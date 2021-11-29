import { queryField, list } from 'nexus'

export const CompanyRoomLocationAggregateQuery = queryField(
  'aggregateCompanyRoomLocation',
  {
    type: 'AggregateCompanyRoomLocation',
    args: {
      where: 'CompanyRoomLocationWhereInput',
      orderBy: list('CompanyRoomLocationOrderByWithRelationInput'),
      cursor: 'CompanyRoomLocationWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.companyRoomLocation.aggregate({ ...args, ...select }) as any
    },
  },
)
