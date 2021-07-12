import { mutationField, nonNull } from 'nexus'

export const AcLogActionDeleteOneMutation = mutationField(
  'deleteOneAcLogAction',
  {
    type: 'AcLogAction',
    args: {
      where: nonNull('AcLogActionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.acLogAction.delete({
        where,
        ...select,
      })
    },
  },
)
