import { queryField, nonNull, list } from 'nexus'

export const PasswordResetAuthFindManyQuery = queryField(
  'findManyPasswordResetAuth',
  {
    type: nonNull(list(nonNull('PasswordResetAuth'))),
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      distinct: 'PasswordResetAuthScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.findMany({
        ...args,
        ...select,
      })
    },
  },
)
