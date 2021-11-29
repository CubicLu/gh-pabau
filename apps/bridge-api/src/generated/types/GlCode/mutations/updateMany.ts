import { mutationField, nonNull } from 'nexus'

export const GlCodeUpdateManyMutation = mutationField('updateManyGlCode', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('GlCodeUpdateManyMutationInput'),
    where: 'GlCodeWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.glCode.updateMany(args as any)
  },
})
