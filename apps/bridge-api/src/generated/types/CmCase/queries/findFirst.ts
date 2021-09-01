import { queryField, list } from 'nexus'

export const CmCaseFindFirstQuery = queryField('findFirstCmCase', {
  type: 'CmCase',
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    distinct: 'CmCaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.findFirst({
      ...args,
      ...select,
    })
  },
})
