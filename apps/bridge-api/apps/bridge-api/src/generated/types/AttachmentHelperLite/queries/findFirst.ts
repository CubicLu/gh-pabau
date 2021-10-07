import { queryField, list } from 'nexus'

export const AttachmentHelperLiteFindFirstQuery = queryField(
  'findFirstAttachmentHelperLite',
  {
    type: 'AttachmentHelperLite',
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByWithRelationInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      distinct: 'AttachmentHelperLiteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachmentHelperLite.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
