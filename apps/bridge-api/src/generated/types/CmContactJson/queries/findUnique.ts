import { queryField, nonNull } from 'nexus'

export const CmContactJsonFindUniqueQuery = queryField(
  'findUniqueCmContactJson',
  {
    type: 'CmContactJson',
    args: {
      where: nonNull('CmContactJsonWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactJson.findUnique({
        where,
        ...select,
      })
    },
  },
)
