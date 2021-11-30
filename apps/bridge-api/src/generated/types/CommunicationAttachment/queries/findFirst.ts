import { queryField, list } from 'nexus'

export const CommunicationAttachmentFindFirstQuery = queryField(
  'findFirstCommunicationAttachment',
  {
    type: 'CommunicationAttachment',
    args: {
      where: 'CommunicationAttachmentWhereInput',
      orderBy: list('CommunicationAttachmentOrderByWithRelationInput'),
      cursor: 'CommunicationAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationAttachment.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
