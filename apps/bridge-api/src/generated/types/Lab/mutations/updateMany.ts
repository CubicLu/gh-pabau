import { mutationField, nonNull } from 'nexus'

export const LabUpdateManyMutation = mutationField('updateManyLab', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'LabWhereInput',
    data: nonNull('LabUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.lab.updateMany(args as any)
  },
})
