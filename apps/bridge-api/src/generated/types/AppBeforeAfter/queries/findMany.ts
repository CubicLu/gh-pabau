import { queryField, nonNull, list } from 'nexus'

export const AppBeforeAfterFindManyQuery = queryField(
  'findManyAppBeforeAfter',
  {
    type: nonNull(list(nonNull('AppBeforeAfter'))),
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppBeforeAfterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.findMany({
        ...args,
        ...select,
      })
    },
  },
)
