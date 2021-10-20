import { queryField, list } from 'nexus'

export const StaffMetaAggregateQuery = queryField('aggregateStaffMeta', {
  type: 'AggregateStaffMeta',
  args: {
    where: 'StaffMetaWhereInput',
    orderBy: list('StaffMetaOrderByWithRelationInput'),
    cursor: 'StaffMetaWhereUniqueInput',
    distinct: 'StaffMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.staffMeta.aggregate({ ...args, ...select }) as any
  },
})
