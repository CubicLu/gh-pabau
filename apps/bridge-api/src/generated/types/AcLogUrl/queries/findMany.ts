import { queryField, nonNull, list } from 'nexus'

export const AcLogUrlFindManyQuery = queryField('findManyAcLogUrl', {
  type: nonNull(list(nonNull('AcLogUrl'))),
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogUrlScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.findMany({
      ...args,
      ...select,
    })
  },
})
