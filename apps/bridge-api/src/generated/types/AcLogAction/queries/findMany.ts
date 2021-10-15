import { queryField, nonNull, list } from 'nexus'

export const AcLogActionFindManyQuery = queryField('findManyAcLogAction', {
  type: nonNull(list(nonNull('AcLogAction'))),
  args: {
    where: 'AcLogActionWhereInput',
    orderBy: list('AcLogActionOrderByInput'),
    cursor: 'AcLogActionWhereUniqueInput',
    distinct: 'AcLogActionScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogAction.findMany({
      ...args,
      ...select,
    })
  },
})
