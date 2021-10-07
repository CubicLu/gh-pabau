import { mutationField, nonNull } from 'nexus'

export const MedicalConditionDeleteOneMutation = mutationField(
  'deleteOneMedicalCondition',
  {
    type: 'MedicalCondition',
    args: {
      where: nonNull('MedicalConditionWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalCondition.delete({
        where,
        ...select,
      })
    },
  },
)
