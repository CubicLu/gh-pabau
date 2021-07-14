import { mutationField, nonNull } from 'nexus'

export const AcLogUrlUpdateManyMutation = mutationField('updateManyAcLogUrl', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'AcLogUrlWhereInput',
    data: nonNull('AcLogUrlUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLogUrl.updateMany(args as any)
  },
})
