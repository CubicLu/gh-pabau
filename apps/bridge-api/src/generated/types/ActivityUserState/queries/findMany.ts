import { queryField, nonNull, list } from 'nexus'

export const ActivityUserStateFindManyQuery = queryField(
  'findManyActivityUserState',
  {
    type: nonNull(list(nonNull('ActivityUserState'))),
    args: {
      where: 'ActivityUserStateWhereInput',
      orderBy: list('ActivityUserStateOrderByWithRelationInput'),
      cursor: 'ActivityUserStateWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('ActivityUserStateScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.activityUserState.findMany({
        ...args,
        ...select,
      })
    },
  },
)
