import { queryField, list } from 'nexus'

export const CmExtraGymAggregateQuery = queryField('aggregateCmExtraGym', {
  type: 'AggregateCmExtraGym',
  args: {
    where: 'CmExtraGymWhereInput',
    orderBy: list('CmExtraGymOrderByInput'),
    cursor: 'CmExtraGymWhereUniqueInput',
    distinct: 'CmExtraGymScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraGym.aggregate({ ...args, ...select }) as any
  },
})
