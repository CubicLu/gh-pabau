import { queryField, list } from 'nexus'

export const RotaShiftAggregateQuery = queryField('aggregateRotaShift', {
  type: 'AggregateRotaShift',
  args: {
    where: 'RotaShiftWhereInput',
    orderBy: list('RotaShiftOrderByInput'),
    cursor: 'RotaShiftWhereUniqueInput',
    distinct: 'RotaShiftScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.rotaShift.aggregate({ ...args, ...select }) as any
  },
})
