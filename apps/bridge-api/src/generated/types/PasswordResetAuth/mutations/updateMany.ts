import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthUpdateManyMutation = mutationField(
  'updateManyPasswordResetAuth',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('PasswordResetAuthUpdateManyMutationInput'),
      where: 'PasswordResetAuthWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.passwordResetAuth.updateMany(args as any)
    },
  },
)
