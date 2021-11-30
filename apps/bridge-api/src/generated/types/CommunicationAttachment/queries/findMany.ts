import { queryField, nonNull, list } from 'nexus'

export const CommunicationAttachmentFindManyQuery = queryField(
  'findManyCommunicationAttachment',
  {
    type: nonNull(list(nonNull('CommunicationAttachment'))),
    args: {
      where: 'CommunicationAttachmentWhereInput',
      orderBy: list('CommunicationAttachmentOrderByWithRelationInput'),
      cursor: 'CommunicationAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationAttachment.findMany({
        ...args,
        ...select,
      })
    },
  },
)
