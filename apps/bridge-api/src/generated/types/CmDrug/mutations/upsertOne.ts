import { mutationField, nonNull } from 'nexus'

export const CmDrugUpsertOneMutation = mutationField('upsertOneCmDrug', {
  type: nonNull('CmDrug'),
  args: {
    where: nonNull('CmDrugWhereUniqueInput'),
    create: nonNull('CmDrugCreateInput'),
    update: nonNull('CmDrugUpdateInput'),
  },
  resolve(_parent, args, { prisma, select }) {
    return prisma.cmDrug.upsert({
      ...args,
      ...select,
    })
  },
})
