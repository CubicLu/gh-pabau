import { queryField, list } from 'nexus'

export const PasswordResetAuthFindFirstQuery = queryField(
  'findFirstPasswordResetAuth',
  {
    type: 'PasswordResetAuth',
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      distinct: 'PasswordResetAuthScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
