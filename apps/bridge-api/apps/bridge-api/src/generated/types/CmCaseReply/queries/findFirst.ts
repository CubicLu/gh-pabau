import { queryField, list } from 'nexus'

export const CmCaseReplyFindFirstQuery = queryField('findFirstCmCaseReply', {
  type: 'CmCaseReply',
  args: {
    where: 'CmCaseReplyWhereInput',
    orderBy: list('CmCaseReplyOrderByWithRelationInput'),
    cursor: 'CmCaseReplyWhereUniqueInput',
    distinct: 'CmCaseReplyScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseReply.findFirst({
      ...args,
      ...select,
    })
  },
})
