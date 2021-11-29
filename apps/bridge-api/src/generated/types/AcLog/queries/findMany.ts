import { queryField, nonNull, list } from 'nexus'

export const AcLogFindManyQuery = queryField('findManyAcLog', {
  type: nonNull(list(nonNull('AcLog'))),
  args: {
    where: 'AcLogWhereInput',
    orderBy: list('AcLogOrderByWithRelationInput'),
    cursor: 'AcLogWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLog.findMany({
      ...args,
      ...select,
    })
  },
})
