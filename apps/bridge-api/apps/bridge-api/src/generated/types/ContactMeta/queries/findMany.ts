import { queryField, nonNull, list } from 'nexus'

export const ContactMetaFindManyQuery = queryField('findManyContactMeta', {
  type: nonNull(list(nonNull('ContactMeta'))),
  args: {
    where: 'ContactMetaWhereInput',
    orderBy: list('ContactMetaOrderByWithRelationInput'),
    cursor: 'ContactMetaWhereUniqueInput',
    distinct: 'ContactMetaScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.contactMeta.findMany({
      ...args,
      ...select,
    })
  },
})
