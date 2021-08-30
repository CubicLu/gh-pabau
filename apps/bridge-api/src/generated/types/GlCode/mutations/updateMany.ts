import { mutationField, nonNull } from 'nexus'

export const GlCodeUpdateManyMutation = mutationField('updateManyGlCode', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'GlCodeWhereInput',
    data: nonNull('GlCodeUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.glCode.updateMany(args as any)
  },
})
