import { queryField, nonNull, list } from 'nexus'

export const InvCategoryFindCountQuery = queryField(
  'findManyInvCategoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'InvCategoryWhereInput',
      orderBy: list('InvCategoryOrderByInput'),
      cursor: 'InvCategoryWhereUniqueInput',
      distinct: 'InvCategoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.invCategory.count(args as any)
    },
  },
)
