import { queryField, nonNull, list } from 'nexus'

export const CommunicationAttachmentFindCountQuery = queryField(
  'findManyCommunicationAttachmentCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationAttachmentWhereInput',
      orderBy: list('CommunicationAttachmentOrderByWithRelationInput'),
      cursor: 'CommunicationAttachmentWhereUniqueInput',
      distinct: 'CommunicationAttachmentScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationAttachment.count(args as any)
    },
  },
)
