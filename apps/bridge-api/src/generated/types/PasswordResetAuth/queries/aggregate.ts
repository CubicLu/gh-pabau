import { queryField, list } from 'nexus'

export const PasswordResetAuthAggregateQuery = queryField(
  'aggregatePasswordResetAuth',
  {
    type: 'AggregatePasswordResetAuth',
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      distinct: 'PasswordResetAuthScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.aggregate({ ...args, ...select }) as any
    },
  },
)
