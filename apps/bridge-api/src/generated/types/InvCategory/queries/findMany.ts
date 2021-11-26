import { queryField, nonNull, list } from 'nexus'

export const InvCategoryFindManyQuery = queryField('findManyInvCategory', {
  type: nonNull(list(nonNull('InvCategory'))),
  args: {
    where: 'InvCategoryWhereInput',
    orderBy: list('InvCategoryOrderByWithRelationInput'),
    cursor: 'InvCategoryWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('InvCategoryScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invCategory.findMany({
      ...args,
      ...select,
    })
  },
})
