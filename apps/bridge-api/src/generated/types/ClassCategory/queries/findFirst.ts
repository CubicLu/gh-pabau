import { queryField, list } from 'nexus'

export const ClassCategoryFindFirstQuery = queryField(
  'findFirstClassCategory',
  {
    type: 'ClassCategory',
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByWithRelationInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
