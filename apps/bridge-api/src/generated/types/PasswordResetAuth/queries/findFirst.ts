import { queryField, list } from 'nexus'

export const PasswordResetAuthFindFirstQuery = queryField(
  'findFirstPasswordResetAuth',
  {
    type: 'PasswordResetAuth',
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByWithRelationInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PasswordResetAuthScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
