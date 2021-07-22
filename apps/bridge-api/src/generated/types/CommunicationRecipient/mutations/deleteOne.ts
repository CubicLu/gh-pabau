import { mutationField, nonNull } from 'nexus'

export const CommunicationRecipientDeleteOneMutation = mutationField(
  'deleteOneCommunicationRecipient',
  {
    type: 'CommunicationRecipient',
    args: {
      where: nonNull('CommunicationRecipientWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationRecipient.delete({
        where,
        ...select,
      })
    },
  },
)
