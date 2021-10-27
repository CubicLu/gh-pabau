import { queryField, nonNull, list } from 'nexus'

export const CmCaseReplyFindCountQuery = queryField(
  'findManyCmCaseReplyCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmCaseReplyWhereInput',
      orderBy: list('CmCaseReplyOrderByWithRelationInput'),
      cursor: 'CmCaseReplyWhereUniqueInput',
      distinct: 'CmCaseReplyScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmCaseReply.count(args as any)
    },
  },
)
