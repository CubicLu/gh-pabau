import { mutationField, nonNull } from 'nexus'

export const AtAnswerUpdateManyMutation = mutationField('updateManyAtAnswer', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'AtAnswerWhereInput',
    data: nonNull('AtAnswerUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atAnswer.updateMany(args as any)
  },
})
