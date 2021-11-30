import { mutationField, nonNull } from 'nexus'

export const CmLabelUpdateManyMutation = mutationField('updateManyCmLabel', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CmLabelUpdateManyMutationInput'),
    where: 'CmLabelWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmLabel.updateMany(args as any)
  },
})
