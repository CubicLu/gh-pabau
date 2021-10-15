import { queryField, nonNull, list } from 'nexus'

export const InvCategoryFindManyQuery = queryField('findManyInvCategory', {
  type: nonNull(list(nonNull('InvCategory'))),
  args: {
    where: 'InvCategoryWhereInput',
    orderBy: list('InvCategoryOrderByInput'),
    cursor: 'InvCategoryWhereUniqueInput',
    distinct: 'InvCategoryScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.invCategory.findMany({
      ...args,
      ...select,
    })
  },
})
