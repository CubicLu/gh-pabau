import { queryField, nonNull } from 'nexus'

export const ClassSmsHistoryFindUniqueQuery = queryField(
  'findUniqueClassSmsHistory',
  {
    type: 'ClassSmsHistory',
    args: {
      where: nonNull('ClassSmsHistoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.classSmsHistory.findUnique({
        where,
        ...select,
      })
    },
  },
)
