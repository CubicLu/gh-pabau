import { mutationField, nonNull } from 'nexus'

export const MedicalConditionCreateOneMutation = mutationField(
  'createOneMedicalCondition',
  {
    type: nonNull('MedicalCondition'),
    args: {
      data: nonNull('MedicalConditionCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalCondition.create({
        data,
        ...select,
      })
    },
  },
)
