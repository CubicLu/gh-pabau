import { mutationField, nonNull } from 'nexus'

export const AtTreatmentUpdateManyMutation = mutationField(
  'updateManyAtTreatment',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'AtTreatmentWhereInput',
      data: nonNull('AtTreatmentUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.atTreatment.updateMany(args as any)
    },
  },
)
