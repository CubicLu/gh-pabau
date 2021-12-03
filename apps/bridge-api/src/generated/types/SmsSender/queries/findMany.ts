import { queryField, nonNull, list } from 'nexus'

export const SmsSenderFindManyQuery = queryField('findManySmsSender', {
  type: nonNull(list(nonNull('SmsSender'))),
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SmsSenderScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.smsSender.findMany({
      ...args,
      ...select,
    })
  },
})
