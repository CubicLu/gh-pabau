import { queryField, list } from 'nexus'

export const AtAnswerFindFirstQuery = queryField('findFirstAtAnswer', {
  type: 'AtAnswer',
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    distinct: 'AtAnswerScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.findFirst({
      ...args,
      ...select,
    })
  },
})
