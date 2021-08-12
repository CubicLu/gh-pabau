import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthUpdateManyMutation = mutationField(
  'updateManyPasswordResetAuth',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'PasswordResetAuthWhereInput',
      data: nonNull('PasswordResetAuthUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.passwordResetAuth.updateMany(args as any)
    },
  },
)
