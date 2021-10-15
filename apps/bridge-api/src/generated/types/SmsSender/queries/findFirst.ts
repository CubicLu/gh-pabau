import { queryField, list } from 'nexus'

export const SmsSenderFindFirstQuery = queryField('findFirstSmsSender', {
  type: 'SmsSender',
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    distinct: 'SmsSenderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.findFirst({
      ...args,
      ...select,
    })
  },
})
