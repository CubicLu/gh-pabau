import { queryField, list } from 'nexus'

export const UserAlertTypeAggregateQuery = queryField(
  'aggregateUserAlertType',
  {
    type: 'AggregateUserAlertType',
    args: {
      where: 'UserAlertTypeWhereInput',
      orderBy: list('UserAlertTypeOrderByInput'),
      cursor: 'UserAlertTypeWhereUniqueInput',
      distinct: 'UserAlertTypeScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userAlertType.aggregate({ ...args, ...select }) as any
    },
  },
)
