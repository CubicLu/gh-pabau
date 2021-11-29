import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryUpdateOneMutation = mutationField(
  'updateOneMedicalFormContactHistory',
  {
    type: nonNull('MedicalFormContactHistory'),
    args: {
      data: nonNull('MedicalFormContactHistoryUpdateInput'),
      where: nonNull('MedicalFormContactHistoryWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalFormContactHistory.update({
        where,
        data,
        ...select,
      })
    },
  },
)
