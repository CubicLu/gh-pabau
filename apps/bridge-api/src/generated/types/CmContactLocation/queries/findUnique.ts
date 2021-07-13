import { queryField, nonNull } from 'nexus'

export const CmContactLocationFindUniqueQuery = queryField(
  'findUniqueCmContactLocation',
  {
    type: 'CmContactLocation',
    args: {
      where: nonNull('CmContactLocationWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactLocation.findUnique({
        where,
        ...select,
      })
    },
  },
)
