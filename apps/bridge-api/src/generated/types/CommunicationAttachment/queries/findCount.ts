import { queryField, nonNull, list } from 'nexus'

export const CommunicationAttachmentFindCountQuery = queryField(
  'findManyCommunicationAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationAttachmentWhereInput',
      orderBy: list('CommunicationAttachmentOrderByWithRelationInput'),
      cursor: 'CommunicationAttachmentWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationAttachmentScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationAttachment.count(args as any)
    },
  },
)
