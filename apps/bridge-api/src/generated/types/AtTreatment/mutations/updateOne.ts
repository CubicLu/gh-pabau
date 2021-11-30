import { mutationField, nonNull } from 'nexus'

export const AtTreatmentUpdateOneMutation = mutationField(
  'updateOneAtTreatment',
  {
    type: nonNull('AtTreatment'),
    args: {
      data: nonNull('AtTreatmentUpdateInput'),
      where: nonNull('AtTreatmentWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.atTreatment.update({
        where,
        data,
        ...select,
      })
    },
  },
)
