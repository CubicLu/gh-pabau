import { queryField, nonNull, list } from 'nexus'

export const AppBeforeAfterFindManyQuery = queryField(
  'findManyAppBeforeAfter',
  {
    type: nonNull(list(nonNull('AppBeforeAfter'))),
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      distinct: 'AppBeforeAfterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.findMany({
        ...args,
        ...select,
      })
    },
  },
)
