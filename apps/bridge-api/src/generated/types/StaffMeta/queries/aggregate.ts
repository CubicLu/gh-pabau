import { queryField, list } from 'nexus'

export const StaffMetaAggregateQuery = queryField('aggregateStaffMeta', {
  type: 'AggregateStaffMeta',
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.aggregate({ ...args, ...select }) as any
  },
})
