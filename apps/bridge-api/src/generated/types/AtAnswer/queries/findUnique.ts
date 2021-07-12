import { queryField, nonNull } from 'nexus'

export const AtAnswerFindUniqueQuery = queryField('findUniqueAtAnswer', {
  type: 'AtAnswer',
  args: {
    where: nonNull('AtAnswerWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.atAnswer.findUnique({
      where,
      ...select,
    })
  },
})
