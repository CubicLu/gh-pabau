import { queryField, nonNull } from 'nexus'

export const ApiDebugFindUniqueQuery = queryField('findUniqueApiDebug', {
  type: 'ApiDebug',
  args: {
    where: nonNull('ApiDebugWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.apiDebug.findUnique({
      where,
      ...select,
    })
  },
})
