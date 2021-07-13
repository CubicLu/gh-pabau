import { queryField, nonNull, list } from 'nexus'

export const CmCaseReplyFindManyQuery = queryField('findManyCmCaseReply', {
  type: nonNull(list(nonNull('CmCaseReply'))),
  args: {
    where: 'CmCaseReplyWhereInput',
    orderBy: list('CmCaseReplyOrderByInput'),
    cursor: 'CmCaseReplyWhereUniqueInput',
    distinct: 'CmCaseReplyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseReply.findMany({
      ...args,
      ...select,
    })
  },
})
