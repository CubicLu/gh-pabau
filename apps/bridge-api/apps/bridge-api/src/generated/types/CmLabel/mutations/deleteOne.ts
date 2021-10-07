import { mutationField, nonNull } from 'nexus'

export const CmLabelDeleteOneMutation = mutationField('deleteOneCmLabel', {
  type: 'CmLabel',
  args: {
    where: nonNull('CmLabelWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmLabel.delete({
      where,
      ...select,
    })
  },
})
