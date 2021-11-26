import { queryField, list } from 'nexus'

export const ClassProductFindFirstQuery = queryField('findFirstClassProduct', {
  type: 'ClassProduct',
  args: {
    where: 'ClassProductWhereInput',
    orderBy: list('ClassProductOrderByWithRelationInput'),
    cursor: 'ClassProductWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassProductScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classProduct.findFirst({
      ...args,
      ...select,
    })
  },
})
