import { queryField, nonNull, list } from 'nexus'

export const AttachmentHelperLiteFindManyQuery = queryField(
  'findManyAttachmentHelperLite',
  {
    type: nonNull(list(nonNull('AttachmentHelperLite'))),
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByWithRelationInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AttachmentHelperLiteScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachmentHelperLite.findMany({
        ...args,
        ...select,
      })
    },
  },
)
