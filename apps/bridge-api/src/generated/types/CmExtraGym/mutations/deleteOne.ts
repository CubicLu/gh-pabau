import { mutationField, nonNull } from 'nexus'

export const CmExtraGymDeleteOneMutation = mutationField(
  'deleteOneCmExtraGym',
  {
    type: 'CmExtraGym',
    args: {
      where: nonNull('CmExtraGymWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmExtraGym.delete({
        where,
        ...select,
      })
    },
  },
)
