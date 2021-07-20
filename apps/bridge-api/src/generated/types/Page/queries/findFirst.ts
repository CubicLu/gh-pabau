import { queryField, list } from 'nexus'

export const PageFindFirstQuery = queryField('findFirstPage', {
  type: 'Page',
  args: {
    where: 'PageWhereInput',
    orderBy: list('PageOrderByInput'),
    cursor: 'PageWhereUniqueInput',
    distinct: 'PageScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.page.findFirst({
      ...args,
      ...select,
    })
  },
})
