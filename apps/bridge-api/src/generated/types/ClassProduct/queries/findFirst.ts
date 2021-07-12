import { queryField, list } from 'nexus'

export const ClassProductFindFirstQuery = queryField('findFirstClassProduct', {
  type: 'ClassProduct',
  args: {
    where: 'ClassProductWhereInput',
    orderBy: list('ClassProductOrderByInput'),
    cursor: 'ClassProductWhereUniqueInput',
    distinct: 'ClassProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classProduct.findFirst({
      ...args,
      ...select,
    })
  },
})
