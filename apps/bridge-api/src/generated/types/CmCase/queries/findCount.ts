import { queryField, nonNull, list } from 'nexus'

export const CmCaseFindCountQuery = queryField('findManyCmCaseCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByWithRelationInput'),
    cursor: 'CmCaseWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('CmCaseScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCase.count(args as any)
  },
})
