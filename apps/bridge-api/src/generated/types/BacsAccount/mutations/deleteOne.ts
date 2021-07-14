import { mutationField, nonNull } from 'nexus'

export const BacsAccountDeleteOneMutation = mutationField(
  'deleteOneBacsAccount',
  {
    type: 'BacsAccount',
    args: {
      where: nonNull('BacsAccountWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.bacsAccount.delete({
        where,
        ...select,
      })
    },
  },
)
