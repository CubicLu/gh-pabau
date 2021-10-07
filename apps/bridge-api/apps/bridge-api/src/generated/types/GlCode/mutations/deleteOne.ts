import { mutationField, nonNull } from 'nexus'

export const GlCodeDeleteOneMutation = mutationField('deleteOneGlCode', {
  type: 'GlCode',
  args: {
    where: nonNull('GlCodeWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.glCode.delete({
      where,
      ...select,
    })
  },
})
