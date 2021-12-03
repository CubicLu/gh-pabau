import { queryField, nonNull, list } from 'nexus'

export const CmCaseFindManyQuery = queryField('findManyCmCase', {
  type: nonNull(list(nonNull('CmCase'))),
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.findMany({
      ...args,
      ...select,
    })
  },
})
