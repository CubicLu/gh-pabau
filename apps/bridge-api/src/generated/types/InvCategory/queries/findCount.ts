import { queryField, nonNull, list } from 'nexus'

export const InvCategoryFindCountQuery = queryField(
  'findManyInvCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvCategoryWhereInput',
      orderBy: list('InvCategoryOrderByWithRelationInput'),
      cursor: 'InvCategoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('InvCategoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invCategory.count(args as any)
    },
  },
)
