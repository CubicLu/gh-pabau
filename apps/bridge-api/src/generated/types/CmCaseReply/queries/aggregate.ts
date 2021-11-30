import { queryField, list } from 'nexus'

export const CmCaseReplyAggregateQuery = queryField('aggregateCmCaseReply', {
  type: 'AggregateCmCaseReply',
  args: {
    where: 'CmCaseReplyWhereInput',
    orderBy: list('CmCaseReplyOrderByWithRelationInput'),
    cursor: 'CmCaseReplyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseReply.aggregate({ ...args, ...select }) as any
  },
})
