import { queryField, list } from 'nexus'

export const AcLogActionFindFirstQuery = queryField('findFirstAcLogAction', {
  type: 'AcLogAction',
  args: {
    where: 'AcLogActionWhereInput',
    orderBy: list('AcLogActionOrderByWithRelationInput'),
    cursor: 'AcLogActionWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AcLogActionScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.acLogAction.findFirst({
      ...args,
      ...select,
    })
  },
})
