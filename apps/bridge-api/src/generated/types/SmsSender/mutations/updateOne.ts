import { mutationField, nonNull } from 'nexus'

export const SmsSenderUpdateOneMutation = mutationField('updateOneSmsSender', {
  type: nonNull('SmsSender'),
  args: {
    data: nonNull('SmsSenderUpdateInput'),
    where: nonNull('SmsSenderWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.smsSender.update({
      where,
      data,
      ...select,
    })
  },
})
