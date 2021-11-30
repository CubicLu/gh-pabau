import { queryField, list } from 'nexus'

export const CommunicationAttachmentAggregateQuery = queryField(
  'aggregateCommunicationAttachment',
  {
    type: 'AggregateCommunicationAttachment',
    args: {
      where: 'CommunicationAttachmentWhereInput',
      orderBy: list('CommunicationAttachmentOrderByWithRelationInput'),
      cursor: 'CommunicationAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationAttachment.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
