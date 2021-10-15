import { queryField, nonNull, list } from 'nexus'

export const ContactAlertFindManyQuery = queryField('findManyContactAlert', {
  type: nonNull(list(nonNull('ContactAlert'))),
  args: {
    where: 'ContactAlertWhereInput',
    orderBy: list('ContactAlertOrderByInput'),
    cursor: 'ContactAlertWhereUniqueInput',
    distinct: 'ContactAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactAlert.findMany({
      ...args,
      ...select,
    })
  },
})
