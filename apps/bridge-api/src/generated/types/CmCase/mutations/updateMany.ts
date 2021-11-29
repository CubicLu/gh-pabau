import { mutationField, nonNull } from 'nexus'

export const CmCaseUpdateManyMutation = mutationField('updateManyCmCase', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CmCaseUpdateManyMutationInput'),
    where: 'CmCaseWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmCase.updateMany(args as any)
  },
})
