import { queryField, list } from 'nexus'

export const ClassProductAggregateQuery = queryField('aggregateClassProduct', {
  type: 'AggregateClassProduct',
  args: {
    where: 'ClassProductWhereInput',
    orderBy: list('ClassProductOrderByWithRelationInput'),
    cursor: 'ClassProductWhereUniqueInput',
    distinct: 'ClassProductScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classProduct.aggregate({ ...args, ...select }) as any
  },
})
