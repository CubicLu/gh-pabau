import { queryField, list } from 'nexus'

export const SmsSenderFindFirstQuery = queryField('findFirstSmsSender', {
  type: 'SmsSender',
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SmsSenderScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.findFirst({
      ...args,
      ...select,
    })
  },
})
