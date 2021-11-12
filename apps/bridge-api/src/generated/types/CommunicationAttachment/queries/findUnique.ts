import { queryField, nonNull } from 'nexus'

export const CommunicationAttachmentFindUniqueQuery = queryField(
  'findUniqueCommunicationAttachment',
  {
    type: 'CommunicationAttachment',
    args: {
      where: nonNull('CommunicationAttachmentWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationAttachment.findUnique({
        where,
        ...select,
      })
    },
  },
)
