import { queryField, list } from 'nexus'

export const CmCaseReplyFindFirstQuery = queryField('findFirstCmCaseReply', {
  type: 'CmCaseReply',
  args: {
    where: 'CmCaseReplyWhereInput',
    orderBy: list('CmCaseReplyOrderByWithRelationInput'),
    cursor: 'CmCaseReplyWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseReplyScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCaseReply.findFirst({
      ...args,
      ...select,
    })
  },
})
