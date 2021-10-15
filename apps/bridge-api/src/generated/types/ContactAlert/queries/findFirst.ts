import { queryField, list } from 'nexus'

export const ContactAlertFindFirstQuery = queryField('findFirstContactAlert', {
  type: 'ContactAlert',
  args: {
    where: 'ContactAlertWhereInput',
    orderBy: list('ContactAlertOrderByInput'),
    cursor: 'ContactAlertWhereUniqueInput',
    distinct: 'ContactAlertScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactAlert.findFirst({
      ...args,
      ...select,
    })
  },
})
