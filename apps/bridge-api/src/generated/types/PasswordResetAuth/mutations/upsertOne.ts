import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthUpsertOneMutation = mutationField(
  'upsertOnePasswordResetAuth',
  {
    type: nonNull('PasswordResetAuth'),
    args: {
      where: nonNull('PasswordResetAuthWhereUniqueInput'),
      create: nonNull('PasswordResetAuthCreateInput'),
      update: nonNull('PasswordResetAuthUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.passwordResetAuth.upsert({
        ...args,
        ...select,
      })
    },
  },
)
