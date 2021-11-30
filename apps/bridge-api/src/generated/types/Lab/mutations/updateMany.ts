import { mutationField, nonNull } from 'nexus'

export const LabUpdateManyMutation = mutationField('updateManyLab', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('LabUpdateManyMutationInput'),
    where: 'LabWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.lab.updateMany(args as any)
  },
})
