import { queryField, nonNull, list } from 'nexus'

export const SmsSenderFindCountQuery = queryField('findManySmsSenderCount', {
  type: nonNull('Int'),
  args: {
    where: 'SmsSenderWhereInput',
    orderBy: list('SmsSenderOrderByInput'),
    cursor: 'SmsSenderWhereUniqueInput',
    distinct: 'SmsSenderScalarFieldEnum',
    skip: 'Int',
    take: 'Int',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.smsSender.count(args as any)
  },
})
