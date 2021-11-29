import { queryField, nonNull, list } from 'nexus'

export const ContactMetaFindManyQuery = queryField('findManyContactMeta', {
  type: nonNull(list(nonNull('ContactMeta'))),
  args: {
    where: 'ContactMetaWhereInput',
    orderBy: list('ContactMetaOrderByWithRelationInput'),
    cursor: 'ContactMetaWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ContactMetaScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactMeta.findMany({
      ...args,
      ...select,
    })
  },
})
