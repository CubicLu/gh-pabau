import { queryField, list } from 'nexus'

export const CmExtraSalonAggregateQuery = queryField('aggregateCmExtraSalon', {
  type: 'AggregateCmExtraSalon',
  args: {
    where: 'CmExtraSalonWhereInput',
    orderBy: list('CmExtraSalonOrderByWithRelationInput'),
    cursor: 'CmExtraSalonWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraSalon.aggregate({ ...args, ...select }) as any
  },
})
