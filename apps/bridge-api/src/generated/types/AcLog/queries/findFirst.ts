import { queryField, list } from 'nexus'

export const AcLogFindFirstQuery = queryField('findFirstAcLog', {
  type: 'AcLog',
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByWithRelationInput'),
    cursor: 'AcLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLog.findFirst({
      ...args,
      ...select,
    })
  },
})
