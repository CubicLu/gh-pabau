import { mutationField, nonNull } from 'nexus'

export const CmContactTravelUpdateOneMutation = mutationField(
  'updateOneCmContactTravel',
  {
    type: nonNull('CmContactTravel'),
    args: {
      data: nonNull('CmContactTravelUpdateInput'),
      where: nonNull('CmContactTravelWhereUniqueInput'),
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
