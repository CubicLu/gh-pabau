import { mutationField, nonNull } from 'nexus'

export const CmDrugUpdateManyMutation = mutationField('updateManyCmDrug', {
  type: nonNull('BatchPayload'),
  args: {
    data: nonNull('CmDrugUpdateManyMutationInput'),
    where: 'CmDrugWhereInput',
  },
  resolve(_parent, args, { prisma }) {
    return prisma.cmDrug.updateMany(args as any)
  },
})
