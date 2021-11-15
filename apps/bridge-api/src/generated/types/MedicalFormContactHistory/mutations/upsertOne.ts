import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryUpsertOneMutation = mutationField(
  'upsertOneMedicalFormContactHistory',
  {
    type: nonNull('MedicalFormContactHistory'),
    args: {
      where: nonNull('MedicalFormContactHistoryWhereUniqueInput'),
      create: nonNull('MedicalFormContactHistoryCreateInput'),
      update: nonNull('MedicalFormContactHistoryUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.upsert({
        ...args,
        ...select,
      })
    },
  },
)
