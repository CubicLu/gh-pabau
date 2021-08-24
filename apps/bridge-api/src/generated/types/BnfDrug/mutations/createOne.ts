import { mutationField, nonNull } from 'nexus'

export const BnfDrugCreateOneMutation = mutationField('createOneBnfDrug', {
  type: nonNull('BnfDrug'),
  args: {
    data: nonNull('BnfDrugCreateInput'),
  },
  resolve(_parent, { data }, { prisma, select }) {
    return prisma.bnfDrug.create({
      data,
      ...select,
    })
  },
})
