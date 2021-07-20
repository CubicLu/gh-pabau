import { mutationField, nonNull } from 'nexus'

export const CmDrugCreateOneMutation = mutationField('createOneCmDrug', {
  type: nonNull('CmDrug'),
  args: {
    data: nonNull('CmDrugCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.cmDrug.create({
      data,
      ...select,
    })
  },
})
