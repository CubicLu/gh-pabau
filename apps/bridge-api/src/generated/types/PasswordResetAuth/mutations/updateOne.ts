import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthUpdateOneMutation = mutationField(
  'updateOnePasswordResetAuth',
  {
    type: nonNull('PasswordResetAuth'),
    args: {
      where: nonNull('PasswordResetAuthWhereUniqueInput'),
      data: nonNull('PasswordResetAuthUpdateInput'),
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
