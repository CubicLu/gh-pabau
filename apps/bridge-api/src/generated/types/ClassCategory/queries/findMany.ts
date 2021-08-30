import { queryField, nonNull, list } from 'nexus'

export const ClassCategoryFindManyQuery = queryField('findManyClassCategory', {
  type: nonNull(list(nonNull('ClassCategory'))),
  args: {
    where: 'ClassCategoryWhereInput',
    orderBy: list('ClassCategoryOrderByInput'),
    cursor: 'ClassCategoryWhereUniqueInput',
    distinct: 'ClassCategoryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.classCategory.findMany({
      ...args,
      ...select,
    })
  },
})
