import { queryField, nonNull } from 'nexus'

export const ActivityUserStateFindUniqueQuery = queryField(
  'findUniqueActivityUserState',
  {
    type: 'ActivityUserState',
    args: {
      where: nonNull('ActivityUserStateWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.activityUserState.findUnique({
        where,
        ...select,
      })
    },
  },
)
