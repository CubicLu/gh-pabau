import { queryField, list } from 'nexus'

export const AcLogUrlFindFirstQuery = queryField('findFirstAcLogUrl', {
  type: 'AcLogUrl',
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    distinct: 'AcLogUrlScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.findFirst({
      ...args,
      ...select,
    })
  },
})
