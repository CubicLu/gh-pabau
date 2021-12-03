import { queryField, nonNull, list } from 'nexus'

export const ClassProductFindCountQuery = queryField(
  'findManyClassProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassProductWhereInput',
      orderBy: list('ClassProductOrderByWithRelationInput'),
      cursor: 'ClassProductWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassProductScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classProduct.count(args as any)
    },
  },
)
