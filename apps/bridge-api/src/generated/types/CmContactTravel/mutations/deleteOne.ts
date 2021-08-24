import { mutationField, nonNull } from 'nexus'

export const CmContactTravelDeleteOneMutation = mutationField(
  'deleteOneCmContactTravel',
  {
    type: 'CmContactTravel',
    args: {
      where: nonNull('CmContactTravelWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmContactTravel.delete({
        where,
        ...select,
      })
    },
  },
)
