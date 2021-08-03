import { queryField, list } from 'nexus'

export const ContactMetaFindFirstQuery = queryField('findFirstContactMeta', {
  type: 'ContactMeta',
  args: {
    where: 'ContactMetaWhereInput',
    orderBy: list('ContactMetaOrderByInput'),
    cursor: 'ContactMetaWhereUniqueInput',
    distinct: 'ContactMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactMeta.findFirst({
      ...args,
      ...select,
    })
  },
})
