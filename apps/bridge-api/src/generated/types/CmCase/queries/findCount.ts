import { queryField, nonNull, list } from 'nexus'

export const CmCaseFindCountQuery = queryField('findManyCmCaseCount', {
  type: nonNull('Int'),
  args: {
    where: 'CmCaseWhereInput',
    orderBy: list('CmCaseOrderByInput'),
    cursor: 'CmCaseWhereUniqueInput',
    distinct: 'CmCaseScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCase.count(args as any)
  },
})
