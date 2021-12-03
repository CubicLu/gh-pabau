import { mutationField, nonNull } from 'nexus'

export const AtTreatmentUpdateManyMutation = mutationField(
  'updateManyAtTreatment',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('AtTreatmentUpdateManyMutationInput'),
      where: 'AtTreatmentWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atTreatment.updateMany(args as any)
    },
  },
)
