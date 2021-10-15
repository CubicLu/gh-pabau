import { queryField, nonNull, list } from 'nexus'

export const AcLogUrlFindManyQuery = queryField('findManyAcLogUrl', {
  type: nonNull(list(nonNull('AcLogUrl'))),
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    distinct: 'AcLogUrlScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogUrl.findMany({
      ...args,
      ...select,
    })
  },
})
