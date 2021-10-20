import { queryField, nonNull, list } from 'nexus'

export const SmsSenderFindManyQuery = queryField('findManySmsSender', {
  type: nonNull(list(nonNull('SmsSender'))),
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    distinct: 'SmsSenderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.findMany({
      ...args,
      ...select,
    })
  },
})
