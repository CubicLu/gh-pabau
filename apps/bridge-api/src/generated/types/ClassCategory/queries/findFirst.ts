import { queryField, list } from 'nexus'

export const ClassCategoryFindFirstQuery = queryField(
  'findFirstClassCategory',
  {
    type: 'ClassCategory',
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      distinct: 'ClassCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.classCategory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
