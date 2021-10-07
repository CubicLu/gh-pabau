import { queryField, nonNull, list } from 'nexus'

export const ClassCategoryFindCountQuery = queryField(
  'findManyClassCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ClassCategoryWhereInput',
      orderBy: list('ClassCategoryOrderByWithRelationInput'),
      cursor: 'ClassCategoryWhereUniqueInput',
      distinct: 'ClassCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.classCategory.count(args as any)
    },
  },
)
