import { queryField, list } from 'nexus'

export const ClassMasterAggregateQuery = queryField('aggregateClassMaster', {
  type: 'AggregateClassMaster',
  args: {
    where: 'ClassMasterWhereInput',
    orderBy: list('ClassMasterOrderByWithRelationInput'),
    cursor: 'ClassMasterWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classMaster.aggregate({ ...args, ...select }) as any
  },
})
