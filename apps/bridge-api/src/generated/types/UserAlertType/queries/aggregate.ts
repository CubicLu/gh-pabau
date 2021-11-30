import { queryField, list } from 'nexus'

export const UserAlertTypeAggregateQuery = queryField(
  'aggregateUserAlertType',
  {
    type: 'AggregateUserAlertType',
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByWithRelationInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertType.aggregate({ ...args, ...select }) as any
    },
  },
)
