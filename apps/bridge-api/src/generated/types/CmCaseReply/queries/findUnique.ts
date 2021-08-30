import { queryField, nonNull } from 'nexus'

export const CmCaseReplyFindUniqueQuery = queryField('findUniqueCmCaseReply', {
  type: 'CmCaseReply',
  args: {
    where: nonNull('CmCaseReplyWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.cmCaseReply.findUnique({
      where,
      ...select,
    })
  },
})
