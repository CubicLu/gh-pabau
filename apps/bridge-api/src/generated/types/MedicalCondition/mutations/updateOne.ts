import { mutationField, nonNull } from 'nexus'

export const MedicalConditionUpdateOneMutation = mutationField(
  'updateOneMedicalCondition',
  {
    type: nonNull('MedicalCondition'),
    args: {
      where: nonNull('MedicalConditionWhereUniqueInput'),
      data: nonNull('MedicalConditionUpdateInput'),
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
