import { queryField, nonNull, list } from 'nexus'

export const ClassCategoryFindCountQuery = queryField(
  'findManyClassCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByWithRelationInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ClassCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classCategory.count(args as any)
    },
  },
)
