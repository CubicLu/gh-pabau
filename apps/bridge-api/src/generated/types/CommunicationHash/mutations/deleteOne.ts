import { mutationField, nonNull } from 'nexus'

export const CommunicationHashDeleteOneMutation = mutationField(
  'deleteOneCommunicationHash',
  {
    type: 'CommunicationHash',
    args: {
      where: nonNull('CommunicationHashWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationHash.delete({
        where,
        ...select,
      })
    },
  },
)
