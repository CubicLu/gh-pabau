import { mutationField, nonNull } from 'nexus'

export const CmDrugUpdateOneMutation = mutationField('updateOneCmDrug', {
  type: nonNull('CmDrug'),
  args: {
    where: nonNull('CmDrugWhereUniqueInput'),
    data: nonNull('CmDrugUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.cmDrug.update({
      where,
      data,
      ...select,
    })
  },
})
