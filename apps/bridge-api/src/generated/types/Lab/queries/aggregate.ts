import { queryField, list } from 'nexus'

export const LabAggregateQuery = queryField('aggregateLab', {
  type: 'AggregateLab',
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    distinct: 'LabScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.aggregate({ ...args, ...select }) as any
  },
})
