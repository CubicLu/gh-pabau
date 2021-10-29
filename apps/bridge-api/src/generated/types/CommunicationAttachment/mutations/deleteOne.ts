import { mutationField, nonNull } from 'nexus'

export const CommunicationAttachmentDeleteOneMutation = mutationField(
  'deleteOneCommunicationAttachment',
  {
    type: 'CommunicationAttachment',
    args: {
      where: nonNull('CommunicationAttachmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationAttachment.delete({
        where,
        ...select,
      })
    },
  },
)
