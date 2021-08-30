import { queryField, nonNull } from 'nexus'

export const CmContactAlertFindUniqueQuery = queryField(
  'findUniqueCmContactAlert',
  {
    type: 'CmContactAlert',
    args: {
      where: nonNull('CmContactAlertWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmContactAlert.findUnique({
        where,
        ...select,
      })
    },
  },
)
