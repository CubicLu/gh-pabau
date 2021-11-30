import { queryField, nonNull, list } from 'nexus'

export const BacsAccountFindCountQuery = queryField(
  'findManyBacsAccountCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'BacsAccountWhereInput',
      orderBy: list('BacsAccountOrderByWithRelationInput'),
      cursor: 'BacsAccountWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('BacsAccountScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bacsAccount.count(args as any)
    },
  },
)
