import { queryField, nonNull, list } from 'nexus'

export const ActivityUserStateFindCountQuery = queryField(
  'findManyActivityUserStateCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityUserStateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.activityUserState.count(args as any)
    },
  },
)
