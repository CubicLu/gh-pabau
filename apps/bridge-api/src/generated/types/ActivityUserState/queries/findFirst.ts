import { queryField, list } from 'nexus'

export const ActivityUserStateFindFirstQuery = queryField(
  'findFirstActivityUserState',
  {
    type: 'ActivityUserState',
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      distinct: 'ActivityUserStateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
