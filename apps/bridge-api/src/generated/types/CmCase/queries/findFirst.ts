import { queryField, list } from 'nexus'

export const CmCaseFindFirstQuery = queryField('findFirstCmCase', {
  type: 'CmCase',
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.findFirst({
      ...args,
      ...select,
    })
  },
})
