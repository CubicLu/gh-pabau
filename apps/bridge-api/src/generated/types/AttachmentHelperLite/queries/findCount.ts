import { queryField, nonNull, list } from 'nexus'

export const AttachmentHelperLiteFindCountQuery = queryField(
  'findManyAttachmentHelperLiteCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByWithRelationInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AttachmentHelperLiteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.attachmentHelperLite.count(args as any)
    },
  },
)
