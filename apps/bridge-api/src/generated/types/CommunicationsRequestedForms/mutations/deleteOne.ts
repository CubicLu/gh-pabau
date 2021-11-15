import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsDeleteOneMutation = mutationField(
  'deleteOneCommunicationsRequestedForms',
  {
    type: 'CommunicationsRequestedForms',
    args: {
      where: nonNull('CommunicationsRequestedFormsWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.communicationsRequestedForms.delete({
        where,
        ...select,
      })
    },
  },
)
