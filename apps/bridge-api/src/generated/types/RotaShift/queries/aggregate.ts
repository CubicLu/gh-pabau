import { queryField, list } from 'nexus'

export const RotaShiftAggregateQuery = queryField('aggregateRotaShift', {
  type: 'AggregateRotaShift',
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByWithRelationInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.rotaShift.aggregate({ ...args, ...select }) as any
  },
})
