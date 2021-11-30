import { queryField, list } from 'nexus'

export const ApiDebugFindFirstQuery = queryField('findFirstApiDebug', {
  type: 'ApiDebug',
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByWithRelationInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiDebugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiDebug.findFirst({
      ...args,
      ...select,
    })
  },
})
