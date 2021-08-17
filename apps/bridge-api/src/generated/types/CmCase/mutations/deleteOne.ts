import { mutationField, nonNull } from 'nexus'

export const CmCaseDeleteOneMutation = mutationField('deleteOneCmCase', {
  type: 'CmCase',
  args: {
    where: nonNull('CmCaseWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmCase.delete({
      where,
      ...select,
    })
  },
})
