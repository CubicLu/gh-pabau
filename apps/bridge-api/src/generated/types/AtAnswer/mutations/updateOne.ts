import { mutationField, nonNull } from 'nexus'

export const AtAnswerUpdateOneMutation = mutationField('updateOneAtAnswer', {
  type: nonNull('AtAnswer'),
  args: {
    where: nonNull('AtAnswerWhereUniqueInput'),
    data: nonNull('AtAnswerUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.atAnswer.update({
      where,
      data,
      ...select,
    })
  },
})
