import { queryField, nonNull, list } from 'nexus'

export const PageFindManyQuery = queryField('findManyPage', {
  type: nonNull(list(nonNull('Page'))),
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByInput'),
    cursor: 'PageWhereUniqueInput',
    distinct: 'PageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.findMany({
      ...args,
      ...select,
    })
  },
})
