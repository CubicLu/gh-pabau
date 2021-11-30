import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralUpdateManyMutation = mutationField(
  'updateManyBookitProGeneral',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('BookitProGeneralUpdateManyMutationInput'),
      where: 'BookitProGeneralWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProGeneral.updateMany(args as any)
    },
  },
)
