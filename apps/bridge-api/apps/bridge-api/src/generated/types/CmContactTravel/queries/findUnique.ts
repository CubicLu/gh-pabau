import { queryField, nonNull } from 'nexus'

export const CmContactTravelFindUniqueQuery = queryField(
  'findUniqueCmContactTravel',
  {
    type: 'CmContactTravel',
    args: {
      where: nonNull('CmContactTravelWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactTravel.findUnique({
        where,
        ...select,
      })
    },
  },
)
