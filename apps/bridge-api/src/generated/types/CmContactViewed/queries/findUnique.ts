import { queryField, nonNull } from 'nexus'

export const CmContactViewedFindUniqueQuery = queryField(
  'findUniqueCmContactViewed',
  {
    type: 'CmContactViewed',
    args: {
      where: nonNull('CmContactViewedWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactViewed.findUnique({
        where,
        ...select,
      })
    },
  },
)
