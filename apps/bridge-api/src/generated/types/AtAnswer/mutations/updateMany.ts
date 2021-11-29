import { mutationField, nonNull } from 'nexus'

export const AtAnswerUpdateManyMutation = mutationField('updateManyAtAnswer', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('AtAnswerUpdateManyMutationInput'),
    where: 'AtAnswerWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.atAnswer.updateMany(args as any)
  },
})
