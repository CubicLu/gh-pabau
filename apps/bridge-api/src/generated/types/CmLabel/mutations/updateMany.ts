import { mutationField, nonNull } from 'nexus'

export const CmLabelUpdateManyMutation = mutationField('updateManyCmLabel', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CmLabelWhereInput',
    data: nonNull('CmLabelUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLabel.updateMany(args as any)
  },
})
