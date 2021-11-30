import { mutationField, nonNull } from 'nexus'

export const MedicalConditionUpdateOneMutation = mutationField(
  'updateOneMedicalCondition',
  {
    type: nonNull('MedicalCondition'),
    args: {
      data: nonNull('MedicalConditionUpdateInput'),
      where: nonNull('MedicalConditionWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalCondition.update({
        where,
        data,
        ...select,
      })
    },
  },
)
