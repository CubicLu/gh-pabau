import { queryField, list } from 'nexus'

export const AppBeforeAfterFindFirstQuery = queryField(
  'findFirstAppBeforeAfter',
  {
    type: 'AppBeforeAfter',
    args: {
      where: 'AppBeforeAfterWhereInput',
      orderBy: list('AppBeforeAfterOrderByInput'),
      cursor: 'AppBeforeAfterWhereUniqueInput',
      distinct: 'AppBeforeAfterScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.appBeforeAfter.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
