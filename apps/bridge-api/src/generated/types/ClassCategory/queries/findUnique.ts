import { queryField, nonNull } from 'nexus'

export const ClassCategoryFindUniqueQuery = queryField(
  'findUniqueClassCategory',
  {
    type: 'ClassCategory',
    args: {
      where: nonNull('ClassCategoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.classCategory.findUnique({
        where,
        ...select,
      })
    },
  },
)
