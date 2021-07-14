import { queryField, nonNull, list } from 'nexus'

export const AttachmentHelperLiteFindManyQuery = queryField(
  'findManyAttachmentHelperLite',
  {
    type: nonNull(list(nonNull('AttachmentHelperLite'))),
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      distinct: 'AttachmentHelperLiteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachmentHelperLite.findMany({
        ...args,
        ...select,
      })
    },
  },
)
