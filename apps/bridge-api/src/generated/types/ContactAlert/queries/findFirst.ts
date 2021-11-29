import { queryField, list } from 'nexus'

export const ContactAlertFindFirstQuery = queryField('findFirstContactAlert', {
  type: 'ContactAlert',
  args: {
    where: 'ContactAlertWhereInput',
    orderBy: list('ContactAlertOrderByWithRelationInput'),
    cursor: 'ContactAlertWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ContactAlertScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactAlert.findFirst({
      ...args,
      ...select,
    })
  },
})
