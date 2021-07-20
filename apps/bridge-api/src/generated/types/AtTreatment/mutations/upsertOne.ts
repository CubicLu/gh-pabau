import { mutationField, nonNull } from 'nexus'

export const AtTreatmentUpsertOneMutation = mutationField(
  'upsertOneAtTreatment',
  {
    type: nonNull('AtTreatment'),
    args: {
      where: nonNull('AtTreatmentWhereUniqueInput'),
      create: nonNull('AtTreatmentCreateInput'),
      update: nonNull('AtTreatmentUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.atTreatment.upsert({
        ...args,
        ...select,
      })
    },
  },
)
