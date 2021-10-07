import { mutationField, nonNull } from 'nexus'

export const CommunicationContentDeleteOneMutation = mutationField(
  'deleteOneCommunicationContent',
  {
    type: 'CommunicationContent',
    args: {
      where: nonNull('CommunicationContentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationContent.delete({
        where,
        ...select,
      })
    },
  },
)
