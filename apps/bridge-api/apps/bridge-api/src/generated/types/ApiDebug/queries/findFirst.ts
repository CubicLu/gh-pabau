import { queryField, list } from 'nexus'

export const ApiDebugFindFirstQuery = queryField('findFirstApiDebug', {
  type: 'ApiDebug',
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByWithRelationInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    distinct: 'ApiDebugScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiDebug.findFirst({
      ...args,
      ...select,
    })
  },
})
