import { queryField, nonNull, list } from 'nexus'

export const ContactAlertFindCountQuery = queryField(
  'findManyContactAlertCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactAlertWhereInput',
      orderBy: list('ContactAlertOrderByInput'),
      cursor: 'ContactAlertWhereUniqueInput',
      distinct: 'ContactAlertScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAlert.count(args as any)
    },
  },
)
