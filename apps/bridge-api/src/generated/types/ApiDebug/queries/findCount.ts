import { queryField, nonNull, list } from 'nexus'

export const ApiDebugFindCountQuery = queryField('findManyApiDebugCount', {
  type: nonNull('Int'),
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByWithRelationInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiDebugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiDebug.count(args as any)
  },
})
