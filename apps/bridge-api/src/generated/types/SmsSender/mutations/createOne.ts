import { mutationField, nonNull } from 'nexus'

export const SmsSenderCreateOneMutation = mutationField('createOneSmsSender', {
  type: nonNull('SmsSender'),
  args: {
    data: nonNull('SmsSenderCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.smsSender.create({
      data,
      ...select,
    })
  },
})
