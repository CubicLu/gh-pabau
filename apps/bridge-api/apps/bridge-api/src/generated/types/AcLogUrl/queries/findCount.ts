import { queryField, nonNull, list } from 'nexus'

export const AcLogUrlFindCountQuery = queryField('findManyAcLogUrlCount', {
  type: nonNull('Int'),
  args: {
    where: 'AcLogUrlWhereInput',
    orderBy: list('AcLogUrlOrderByWithRelationInput'),
    cursor: 'AcLogUrlWhereUniqueInput',
    distinct: 'AcLogUrlScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLogUrl.count(args as any)
  },
})
