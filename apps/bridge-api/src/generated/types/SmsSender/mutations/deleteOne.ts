import { mutationField, nonNull } from 'nexus'

export const SmsSenderDeleteOneMutation = mutationField('deleteOneSmsSender', {
  type: 'SmsSender',
  args: {
    where: nonNull('SmsSenderWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.smsSender.delete({
      where,
      ...select,
    })
  },
})
