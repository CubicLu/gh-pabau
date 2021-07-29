import { queryField, nonNull } from 'nexus'

export const CmContactCustomFindUniqueQuery = queryField(
  'findUniqueCmContactCustom',
  {
    type: 'CmContactCustom',
    args: {
      where: nonNull('CmContactCustomWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactCustom.findUnique({
        where,
        ...select,
      })
    },
  },
)
