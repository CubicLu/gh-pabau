import { queryField, nonNull } from 'nexus'

export const ActivityUserColumnsFindUniqueQuery = queryField(
  'findUniqueActivityUserColumns',
  {
    type: 'ActivityUserColumns',
    args: {
      where: nonNull('ActivityUserColumnsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.activityUserColumns.findUnique({
        where,
        ...select,
      })
    },
  },
)
