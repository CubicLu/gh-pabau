import { queryField, nonNull, list } from 'nexus'

export const CmContactAlertFindManyQuery = queryField(
  'findManyCmContactAlert',
  {
    type: nonNull(list(nonNull('CmContactAlert'))),
    args: {
      where: 'CmContactAlertWhereInput',
      orderBy: list('CmContactAlertOrderByInput'),
      cursor: 'CmContactAlertWhereUniqueInput',
      distinct: 'CmContactAlertScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmContactAlert.findMany({
        ...args,
        ...select,
      })
    },
  },
)
