import { queryField, list } from 'nexus'

export const PasswordResetAuthAggregateQuery = queryField(
  'aggregatePasswordResetAuth',
  {
    type: 'AggregatePasswordResetAuth',
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByWithRelationInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.aggregate({ ...args, ...select }) as any
    },
  },
)
