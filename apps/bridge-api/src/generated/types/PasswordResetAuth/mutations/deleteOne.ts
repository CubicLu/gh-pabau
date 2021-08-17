import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthDeleteOneMutation = mutationField(
  'deleteOnePasswordResetAuth',
  {
    type: 'PasswordResetAuth',
    args: {
      where: nonNull('PasswordResetAuthWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.passwordResetAuth.delete({
        where,
        ...select,
      })
    },
  },
)
