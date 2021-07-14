import { queryField, list } from 'nexus'

export const CmExtraSalonAggregateQuery = queryField('aggregateCmExtraSalon', {
  type: 'AggregateCmExtraSalon',
  args: {
    where: 'CmExtraSalonWhereInput',
    orderBy: list('CmExtraSalonOrderByInput'),
    cursor: 'CmExtraSalonWhereUniqueInput',
    distinct: 'CmExtraSalonScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmExtraSalon.aggregate({ ...args, ...select }) as any
  },
})
