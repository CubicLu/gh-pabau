import { queryField, nonNull, list } from 'nexus'

export const AcLogActionFindManyQuery = queryField('findManyAcLogAction', {
  type: nonNull(list(nonNull('AcLogAction'))),
  args: {
    where: 'AcLogActionWhereInput',
    orderBy: list('AcLogActionOrderByWithRelationInput'),
    cursor: 'AcLogActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogActionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogAction.findMany({
      ...args,
      ...select,
    })
  },
})
