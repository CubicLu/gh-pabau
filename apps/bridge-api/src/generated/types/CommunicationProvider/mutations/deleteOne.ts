import { mutationField, nonNull } from 'nexus'

export const CommunicationProviderDeleteOneMutation = mutationField(
  'deleteOneCommunicationProvider',
  {
    type: 'CommunicationProvider',
    args: {
      where: nonNull('CommunicationProviderWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationProvider.delete({
        where,
        ...select,
      })
    },
  },
)
