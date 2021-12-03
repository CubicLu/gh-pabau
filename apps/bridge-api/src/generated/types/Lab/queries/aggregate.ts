import { queryField, list } from 'nexus'

export const LabAggregateQuery = queryField('aggregateLab', {
  type: 'AggregateLab',
  args: {
    where: 'LabWhereInput',
    orderBy: list('LabOrderByWithRelationInput'),
    cursor: 'LabWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.lab.aggregate({ ...args, ...select }) as any
  },
})
