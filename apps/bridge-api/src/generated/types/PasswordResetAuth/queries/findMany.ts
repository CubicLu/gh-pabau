import { queryField, nonNull, list } from 'nexus'

export const PasswordResetAuthFindManyQuery = queryField(
  'findManyPasswordResetAuth',
  {
    type: nonNull(list(nonNull('PasswordResetAuth'))),
    args: {
      where: 'PasswordResetAuthWhereInput',
      orderBy: list('PasswordResetAuthOrderByWithRelationInput'),
      cursor: 'PasswordResetAuthWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('PasswordResetAuthScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.findMany({
        ...args,
        ...select,
      })
    },
  },
)
