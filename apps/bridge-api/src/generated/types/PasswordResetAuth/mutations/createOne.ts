import { mutationField, nonNull } from 'nexus'

export const PasswordResetAuthCreateOneMutation = mutationField(
  'createOnePasswordResetAuth',
  {
    type: nonNull('PasswordResetAuth'),
    args: {
      data: nonNull('PasswordResetAuthCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.passwordResetAuth.create({
        data,
        ...select,
      })
    },
  },
)
