import { queryField, nonNull, list } from 'nexus'

export const ClassCategoryFindManyQuery = queryField('findManyClassCategory', {
  type: nonNull(list(nonNull('ClassCategory'))),
  args: {
    where: 'ClassCategoryWhereInput',
    orderBy: list('ClassCategoryOrderByWithRelationInput'),
    cursor: 'ClassCategoryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ClassCategoryScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classCategory.findMany({
      ...args,
      ...select,
    })
  },
})
