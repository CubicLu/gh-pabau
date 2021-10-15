import { queryField, nonNull, list } from 'nexus'

export const ApiDebugFindCountQuery = queryField('findManyApiDebugCount', {
  type: nonNull('Int'),
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    distinct: 'ApiDebugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.apiDebug.count(args as any)
  },
})
