import { mutationField, nonNull } from 'nexus'

export const AtTreatmentCreateOneMutation = mutationField(
  'createOneAtTreatment',
  {
    type: nonNull('AtTreatment'),
    args: {
      data: nonNull('AtTreatmentCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.atTreatment.create({
        data,
        ...select,
      })
    },
  },
)
