import { queryField, list } from 'nexus'

export const ContactMetaAggregateQuery = queryField('aggregateContactMeta', {
  type: 'AggregateContactMeta',
  args: {
    where: 'ContactMetaWhereInput',
    orderBy: list('ContactMetaOrderByWithRelationInput'),
    cursor: 'ContactMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactMeta.aggregate({ ...args, ...select }) as any
  },
})
