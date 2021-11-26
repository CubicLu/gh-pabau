import { queryField, list } from 'nexus'

export const AppBeforeAfterFindFirstQuery = queryField(
  'findFirstAppBeforeAfter',
  {
    type: 'AppBeforeAfter',
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByWithRelationInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('AppBeforeAfterScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
