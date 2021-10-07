import { mutationField, nonNull } from 'nexus'

export const MedicalConditionUpsertOneMutation = mutationField(
  'upsertOneMedicalCondition',
  {
    type: nonNull('MedicalCondition'),
    args: {
      where: nonNull('MedicalConditionWhereUniqueInput'),
      create: nonNull('MedicalConditionCreateInput'),
      update: nonNull('MedicalConditionUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalCondition.upsert({
        ...args,
        ...select,
      })
    },
  },
)
