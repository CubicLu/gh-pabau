import { mutationField, nonNull } from 'nexus'

export const CmDrugUpdateManyMutation = mutationField('updateManyCmDrug', {
  type: nonNull('BatchPayload'),
  args: {
    where: 'CmDrugWhereInput',
    data: nonNull('CmDrugUpdateManyMutationInput'),
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmDrug.updateMany(args as any)
  },
})
