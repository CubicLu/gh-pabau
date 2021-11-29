import { queryField, nonNull, list } from 'nexus'

export const ContactAlertFindManyQuery = queryField('findManyContactAlert', {
  type: nonNull(list(nonNull('ContactAlert'))),
  args: {
    where: 'ContactAlertWhereInput',
    orderBy: list('ContactAlertOrderByWithRelationInput'),
    cursor: 'ContactAlertWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ContactAlertScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactAlert.findMany({
      ...args,
      ...select,
    })
  },
})
