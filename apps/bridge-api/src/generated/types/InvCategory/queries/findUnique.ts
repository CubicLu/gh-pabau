import { queryField, nonNull } from 'nexus'

export const InvCategoryFindUniqueQuery = queryField('findUniqueInvCategory', {
  type: 'InvCategory',
  args: {
    where: nonNull('InvCategoryWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.invCategory.findUnique({
      where,
      ...select,
    })
  },
})
