import { queryField, nonNull } from 'nexus'

export const PasswordResetAuthFindUniqueQuery = queryField(
  'findUniquePasswordResetAuth',
  {
    type: 'PasswordResetAuth',
    args: {
      where: nonNull('PasswordResetAuthWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.passwordResetAuth.findUnique({
        where,
        ...select,
      })
    },
  },
)
