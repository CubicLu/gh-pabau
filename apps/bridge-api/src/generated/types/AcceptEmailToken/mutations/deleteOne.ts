import { mutationField, nonNull } from 'nexus'

export const AcceptEmailTokenDeleteOneMutation = mutationField(
  'deleteOneAcceptEmailToken',
  {
    type: 'AcceptEmailToken',
    args: {
      where: nonNull('AcceptEmailTokenWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.acceptEmailToken.delete({
        where,
        ...select,
      })
    },
  },
)
