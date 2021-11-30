import { queryField, list } from 'nexus'

export const CompanyRoomAggregateQuery = queryField('aggregateCompanyRoom', {
  type: 'AggregateCompanyRoom',
  args: {
    where: 'CompanyRoomWhereInput',
    orderBy: list('CompanyRoomOrderByWithRelationInput'),
    cursor: 'CompanyRoomWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.companyRoom.aggregate({ ...args, ...select }) as any
  },
})
