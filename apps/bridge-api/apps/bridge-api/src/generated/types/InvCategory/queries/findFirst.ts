import { queryField, list } from 'nexus'

export const InvCategoryFindFirstQuery = queryField('findFirstInvCategory', {
  type: 'InvCategory',
  args: {
    where: 'InvCategoryWhereInput',
    orderBy: list('InvCategoryOrderByWithRelationInput'),
    cursor: 'InvCategoryWhereUniqueInput',
    distinct: 'InvCategoryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invCategory.findFirst({
      ...args,
      ...select,
    })
  },
})
