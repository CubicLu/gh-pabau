import { mutationField, nonNull } from 'nexus'

export const AtAnswerUpdateOneMutation = mutationField('updateOneAtAnswer', {
  type: nonNull('AtAnswer'),
  args: {
    data: nonNull('AtAnswerUpdateInput'),
    where: nonNull('AtAnswerWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atAnswer.update({
      where,
      data,
      ...select,
    })
  },
})
