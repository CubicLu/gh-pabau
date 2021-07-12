import { mutationField, nonNull } from 'nexus'

export const AcLogUrlDeleteOneMutation = mutationField('deleteOneAcLogUrl', {
  type: 'AcLogUrl',
  args: {
    where: nonNull('AcLogUrlWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.acLogUrl.delete({
      where,
      ...select,
    })
  },
})
