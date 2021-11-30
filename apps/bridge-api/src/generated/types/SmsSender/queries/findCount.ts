import { queryField, nonNull, list } from 'nexus'

export const SmsSenderFindCountQuery = queryField('findManySmsSenderCount', {
  type: nonNull('Int'),
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByWithRelationInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    take: 'Int',
    skip: 'Int',
    distinct: list('SmsSenderScalarFieldEnum'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.smsSender.count(args as any)
  },
})
