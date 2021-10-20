import { queryField, nonNull, list } from 'nexus'

export const ClassProductFindManyQuery = queryField('findManyClassProduct', {
  type: nonNull(list(nonNull('ClassProduct'))),
  args: {
    where: 'ClassProductWhereInput',
    orderBy: list('ClassProductOrderByWithRelationInput'),
    cursor: 'ClassProductWhereUniqueInput',
    distinct: 'ClassProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classProduct.findMany({
      ...args,
      ...select,
    })
  },
})
