import { queryField, nonNull, list } from 'nexus'

export const PageFindCountQuery = queryField('findManyPageCount', {
  type: nonNull('Int'),
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByInput'),
    cursor: 'PageWhereUniqueInput',
    distinct: 'PageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.page.count(args as any)
  },
})
