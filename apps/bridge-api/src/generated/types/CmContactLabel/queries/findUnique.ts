import { queryField, nonNull } from 'nexus'

export const CmContactLabelFindUniqueQuery = queryField(
  'findUniqueCmContactLabel',
  {
    type: 'CmContactLabel',
    args: {
      where: nonNull('CmContactLabelWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactLabel.findUnique({
        where,
        ...select,
      })
    },
  },
)
