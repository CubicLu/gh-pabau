import { queryField, nonNull } from 'nexus'

export const SmsSenderFindUniqueQuery = queryField('findUniqueSmsSender', {
  type: 'SmsSender',
  args: {
    where: nonNull('SmsSenderWhereUniqueInput'),
  },
  resolve(_parent, { where }, { prisma, select }) {
    return prisma.smsSender.findUnique({
      where,
      ...select,
    })
  },
})
