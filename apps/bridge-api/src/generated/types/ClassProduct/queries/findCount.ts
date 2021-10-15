import { queryField, nonNull, list } from 'nexus'

export const ClassProductFindCountQuery = queryField(
  'findManyClassProductCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassProductWhereInput',
      orderBy: list('ClassProductOrderByInput'),
      cursor: 'ClassProductWhereUniqueInput',
      distinct: 'ClassProductScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classProduct.count(args as any)
    },
  },
)
