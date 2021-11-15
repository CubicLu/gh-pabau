import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryCreateOneMutation = mutationField(
  'createOneMedicalFormContactHistory',
  {
    type: nonNull('MedicalFormContactHistory'),
    args: {
      data: nonNull('MedicalFormContactHistoryCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalFormContactHistory.create({
        data,
        ...select,
      })
    },
  },
)
