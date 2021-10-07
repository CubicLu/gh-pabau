import { queryField, list } from 'nexus'

export const AcLogActionFindFirstQuery = queryField('findFirstAcLogAction', {
  type: 'AcLogAction',
  args: {
    where: 'AcLogActionWhereInput',
    orderBy: list('AcLogActionOrderByWithRelationInput'),
    cursor: 'AcLogActionWhereUniqueInput',
    distinct: 'AcLogActionScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogAction.findFirst({
      ...args,
      ...select,
    })
  },
})
