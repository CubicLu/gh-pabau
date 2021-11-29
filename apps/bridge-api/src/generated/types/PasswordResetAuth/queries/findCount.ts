import { queryField, nonNull, list } from 'nexus'

export const PasswordResetAuthFindCountQuery = queryField(
  'findManyPasswordResetAuthCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByWithRelationInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PasswordResetAuthScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.passwordResetAuth.count(args as any)
    },
  },
)
