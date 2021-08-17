import { mutationField, nonNull } from 'nexus'

export const AtTreatmentDeleteOneMutation = mutationField(
  'deleteOneAtTreatment',
  {
    type: 'AtTreatment',
    args: {
      where: nonNull('AtTreatmentWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.atTreatment.delete({
        where,
        ...select,
      })
    },
  },
)
