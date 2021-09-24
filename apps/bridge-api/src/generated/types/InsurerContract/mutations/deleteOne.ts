import { mutationField, nonNull } from 'nexus'

export const InsurerContractDeleteOneMutation = mutationField(
  'deleteOneInsurerContract',
  {
    type: 'InsurerContract',
    args: {
      where: nonNull('InsurerContractWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.insurerContract.delete({
        where,
        ...select,
      })
    },
  },
)
