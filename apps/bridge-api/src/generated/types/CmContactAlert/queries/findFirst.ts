import { queryField, list } from 'nexus'

export const CmContactAlertFindFirstQuery = queryField(
  'findFirstCmContactAlert',
  {
    type: 'CmContactAlert',
    args: {
      where: 'CmContactAlertWhereInput',
      orderBy: list('CmContactAlertOrderByInput'),
      cursor: 'CmContactAlertWhereUniqueInput',
      distinct: 'CmContactAlertScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactAlert.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
