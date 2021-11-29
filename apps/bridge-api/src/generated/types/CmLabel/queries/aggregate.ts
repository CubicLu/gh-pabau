import { queryField, list } from 'nexus'

export const CmLabelAggregateQuery = queryField('aggregateCmLabel', {
  type: 'AggregateCmLabel',
  args: {
    where: 'CmLabelWhereInput',
    orderBy: list('CmLabelOrderByWithRelationInput'),
    cursor: 'CmLabelWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmLabel.aggregate({ ...args, ...select }) as any
  },
})
