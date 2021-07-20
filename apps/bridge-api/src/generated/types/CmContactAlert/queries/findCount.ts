import { queryField, nonNull, list } from 'nexus'

export const CmContactAlertFindCountQuery = queryField(
  'findManyCmContactAlertCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmContactAlertWhereInput',
      orderBy: list('CmContactAlertOrderByInput'),
      cursor: 'CmContactAlertWhereUniqueInput',
      distinct: 'CmContactAlertScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmContactAlert.count(args as any)
    },
  },
)
