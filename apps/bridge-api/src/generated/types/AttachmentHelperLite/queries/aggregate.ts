import { queryField, list } from 'nexus'

export const AttachmentHelperLiteAggregateQuery = queryField(
  'aggregateAttachmentHelperLite',
  {
    type: 'AggregateAttachmentHelperLite',
    args: {
      where: 'AttachmentHelperLiteWhereInput',
      orderBy: list('AttachmentHelperLiteOrderByWithRelationInput'),
      cursor: 'AttachmentHelperLiteWhereUniqueInput',
      distinct: 'AttachmentHelperLiteScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.attachmentHelperLite.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
