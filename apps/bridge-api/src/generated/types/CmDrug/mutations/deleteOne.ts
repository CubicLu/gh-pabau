import { mutationField, nonNull } from 'nexus'

export const CmDrugDeleteOneMutation = mutationField('deleteOneCmDrug', {
  type: 'CmDrug',
  args: {
    where: nonNull('CmDrugWhereUniqueInput'),
  },
  resolve: async (_parent, { where }, { prisma, select }) => {
    return prisma.cmDrug.delete({
      where,
      ...select,
    })
  },
})
