import { queryField, list } from 'nexus'

export const ActivityUserStateFindFirstQuery = queryField(
  'findFirstActivityUserState',
  {
    type: 'ActivityUserState',
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityUserStateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
