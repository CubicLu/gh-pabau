import { queryField, list } from 'nexus'

export const AtAnswerFindFirstQuery = queryField('findFirstAtAnswer', {
  type: 'AtAnswer',
  args: {
    where: 'AtAnswerWhereInput',
    orderBy: list('AtAnswerOrderByWithRelationInput'),
    cursor: 'AtAnswerWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('AtAnswerScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.atAnswer.findFirst({
      ...args,
      ...select,
    })
  },
})
