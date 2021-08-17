import { mutationField, nonNull } from 'nexus'

export const CmContactTravelUpdateOneMutation = mutationField(
  'updateOneCmContactTravel',
  {
    type: nonNull('CmContactTravel'),
    args: {
      where: nonNull('CmContactTravelWhereUniqueInput'),
      data: nonNull('CmContactTravelUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmContactTravel.update({
        where,
        data,
        ...select,
      })
    },
  },
)
