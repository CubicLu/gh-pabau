import { mutationField, nonNull } from 'nexus'

export const AtTreatmentUpdateOneMutation = mutationField(
  'updateOneAtTreatment',
  {
    type: nonNull('AtTreatment'),
    args: {
      where: nonNull('AtTreatmentWhereUniqueInput'),
      data: nonNull('AtTreatmentUpdateInput'),
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
