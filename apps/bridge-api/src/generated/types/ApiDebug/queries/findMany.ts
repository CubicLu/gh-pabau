import { queryField, nonNull, list } from 'nexus'

export const ApiDebugFindManyQuery = queryField('findManyApiDebug', {
  type: nonNull(list(nonNull('ApiDebug'))),
  args: {
    where: 'ApiDebugWhereInput',
    orderBy: list('ApiDebugOrderByWithRelationInput'),
    cursor: 'ApiDebugWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('ApiDebugScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.apiDebug.findMany({
      ...args,
      ...select,
    })
  },
})
