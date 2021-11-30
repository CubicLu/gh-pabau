import { queryField, list } from 'nexus'

export const AcLogUrlFindFirstQuery = queryField('findFirstAcLogUrl', {
  type: 'AcLogUrl',
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogUrlScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.findFirst({
      ...args,
      ...select,
    })
  },
})
