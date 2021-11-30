import { mutationField, nonNull } from 'nexus'

export const CmDrugUpdateOneMutation = mutationField('updateOneCmDrug', {
  type: nonNull('CmDrug'),
  args: {
    data: nonNull('CmDrugUpdateInput'),
    where: nonNull('CmDrugWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmDrug.update({
      where,
      data,
      ...select,
    })
  },
})
