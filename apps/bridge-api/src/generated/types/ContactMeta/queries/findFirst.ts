import { queryField, list } from 'nexus'

export const ContactMetaFindFirstQuery = queryField('findFirstContactMeta', {
  type: 'ContactMeta',
  args: {
    where: 'ContactMetaWhereInput',
    orderBy: list('ContactMetaOrderByWithRelationInput'),
    cursor: 'ContactMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ContactMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
