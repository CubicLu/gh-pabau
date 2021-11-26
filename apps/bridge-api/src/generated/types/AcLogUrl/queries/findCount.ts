import { queryField, nonNull, list } from 'nexus'

export const AcLogUrlFindCountQuery = queryField('findManyAcLogUrlCount', {
  type: nonNull('Int'),
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogUrlScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLogUrl.count(args as any)
  },
})
