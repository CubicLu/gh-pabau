import { queryField, nonNull, list } from 'nexus'

export const AttachmentHelperLiteFindCountQuery = queryField(
  'findManyAttachmentHelperLiteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByWithRelationInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      distinct: 'AttachmentHelperLiteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attachmentHelperLite.count(args as any)
    },
  },
)
