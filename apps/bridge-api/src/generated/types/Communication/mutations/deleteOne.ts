import { mutationField, nonNull } from 'nexus'

export const CommunicationDeleteOneMutation = mutationField(
  'deleteOneCommunication',
  {
    type: 'Communication',
    args: {
      where: nonNull('CommunicationWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communication.delete({
        where,
        ...select,
      })
    },
  },
)
