import { mutationField, nonNull } from 'nexus'

export const SmsSenderUpdateOneMutation = mutationField('updateOneSmsSender', {
  type: nonNull('SmsSender'),
  args: {
    where: nonNull('SmsSenderWhereUniqueInput'),
    data: nonNull('SmsSenderUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.smsSender.update({
      where,
      data,
      ...select,
    })
  },
})
