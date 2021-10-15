import { queryField, nonNull, list } from 'nexus'

export const ActivityUserStateFindCountQuery = queryField(
  'findManyActivityUserStateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      distinct: 'ActivityUserStateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserState.count(args as any)
    },
  },
)
