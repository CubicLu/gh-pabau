import { mutationField, nonNull } from 'nexus'

export const CmCaseUpdateManyMutation = mutationField('updateManyCmCase', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CmCaseWhereInput',
    data: nonNull('CmCaseUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCase.updateMany(args as any)
  },
})
