import { queryField, list } from 'nexus'

export const CmExtraGymAggregateQuery = queryField('aggregateCmExtraGym', {
  type: 'AggregateCmExtraGym',
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByWithRelationInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.aggregate({ ...args, ...select }) as any
  },
})
