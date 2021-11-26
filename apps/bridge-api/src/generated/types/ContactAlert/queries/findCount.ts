import { queryField, nonNull, list } from 'nexus'

export const ContactAlertFindCountQuery = queryField(
  'findManyContactAlertCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactAlertWhereInput',
      orderBy: list('ContactAlertOrderByWithRelationInput'),
      cursor: 'ContactAlertWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactAlertScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactAlert.count(args as any)
    },
  },
)
