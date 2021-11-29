import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthUpdateOneMutation = mutationField(
  'updateOnePasswordResetAuth',
  {
    type: nonNull('PasswordResetAuth'),
    args: {
      data: nonNull('PasswordResetAuthUpdateInput'),
      where: nonNull('PasswordResetAuthWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.passwordResetAuth.update({
        where,
        data,
        ...select,
      })
    },
  },
)
