import { mutationField, nonNull } from 'nexus'

export const LabDeleteOneMutation = mutationField('deleteOneLab', {
  type: 'Lab',
  args: {
    where: nonNull('LabWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.lab.delete({
      where,
      ...select,
    })
  },
})
