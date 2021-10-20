import { queryField, nonNull, list } from 'nexus'

export const ActivityUserStateFindManyQuery = queryField(
  'findManyActivityUserState',
  {
    type: nonNull(list(nonNull('ActivityUserState'))),
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      distinct: 'ActivityUserStateScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.findMany({
        ...args,
        ...select,
      })
    },
  },
)
