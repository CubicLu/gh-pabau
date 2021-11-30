import { queryField, nonNull, list } from 'nexus'

export const ContactMetaFindCountQuery = queryField(
  'findManyContactMetaCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ContactMetaWhereInput',
      orderBy: list('ContactMetaOrderByWithRelationInput'),
      cursor: 'ContactMetaWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ContactMetaScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.contactMeta.count(args as any)
    },
  },
)
