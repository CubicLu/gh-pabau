import { queryField, list } from 'nexus'

export const MediaLlibraryAttachmentAggregateQuery = queryField(
  'aggregateMediaLlibraryAttachment',
  {
    type: 'AggregateMediaLlibraryAttachment',
    args: {
      where: 'MediaLlibraryAttachmentWhereInput',
      orderBy: list('MediaLlibraryAttachmentOrderByWithRelationInput'),
      cursor: 'MediaLlibraryAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.mediaLlibraryAttachment.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
