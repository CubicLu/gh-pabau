import { mutationField, nonNull } from 'nexus'

export const PageUpdateManyMutation = mutationField('updateManyPage', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'PageWhereInput',
    data: nonNull('PageUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.page.updateMany(args as any)
  },
})
