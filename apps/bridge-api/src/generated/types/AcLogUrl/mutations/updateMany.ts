import { mutationField, nonNull } from 'nexus'

export const AcLogUrlUpdateManyMutation = mutationField('updateManyAcLogUrl', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('AcLogUrlUpdateManyMutationInput'),
    where: 'AcLogUrlWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.acLogUrl.updateMany(args as any)
  },
})
