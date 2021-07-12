import { mutationField, nonNull } from 'nexus'

export const AtAnswerCreateOneMutation = mutationField('createOneAtAnswer', {
  type: nonNull('AtAnswer'),
  args: {
    data: nonNull('AtAnswerCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.atAnswer.create({
      data,
      ...select,
    })
  },
})
