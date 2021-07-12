import { mutationField, nonNull } from 'nexus'

export const BookitProGeneralUpdateManyMutation = mutationField(
  'updateManyBookitProGeneral',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'BookitProGeneralWhereInput',
      data: nonNull('BookitProGeneralUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.bookitProGeneral.updateMany(args as any)
    },
  },
)
