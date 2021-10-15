import { queryField, nonNull, list } from 'nexus'

export const CmCaseFindManyQuery = queryField('findManyCmCase', {
  type: nonNull(list(nonNull('CmCase'))),
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByInput'),
    cursor: 'CmCaseWhereUniqueInput',
    distinct: 'CmCaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmCase.findMany({
      ...args,
      ...select,
    })
  },
})
