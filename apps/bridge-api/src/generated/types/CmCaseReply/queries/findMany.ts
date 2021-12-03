import { queryField, nonNull, list } from 'nexus'

export const CmCaseReplyFindManyQuery = queryField('findManyCmCaseReply', {
  type: nonNull(list(nonNull('CmCaseReply'))),
  args: {
    where: 'CmCaseReplyWhereInput',
    orderBy: list('CmCaseReplyOrderByWithRelationInput'),
    cursor: 'CmCaseReplyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseReplyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseReply.findMany({
      ...args,
      ...select,
    })
  },
})
