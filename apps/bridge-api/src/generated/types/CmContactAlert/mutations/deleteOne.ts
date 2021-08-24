import { mutationField, nonNull } from 'nexus'

export const CmContactAlertDeleteOneMutation = mutationField(
  'deleteOneCmContactAlert',
  {
    type: 'CmContactAlert',
    args: {
      where: nonNull('CmContactAlertWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactAlert.delete({
        where,
        ...select,
      })
    },
  },
)
