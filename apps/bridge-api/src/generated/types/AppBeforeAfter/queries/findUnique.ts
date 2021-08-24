import { queryField, nonNull } from 'nexus'

export const AppBeforeAfterFindUniqueQuery = queryField(
  'findUniqueAppBeforeAfter',
  {
    type: 'AppBeforeAfter',
    args: {
      where: nonNull('AppBeforeAfterWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.appBeforeAfter.findUnique({
        where,
        ...select,
      })
    },
  },
)
