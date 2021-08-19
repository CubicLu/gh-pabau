import { queryField, nonNull, list } from 'nexus'

export const PasswordResetAuthFindCountQuery = queryField(
  'findManyPasswordResetAuthCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      distinct: 'PasswordResetAuthScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.passwordResetAuth.count(args as any)
    },
  },
)
