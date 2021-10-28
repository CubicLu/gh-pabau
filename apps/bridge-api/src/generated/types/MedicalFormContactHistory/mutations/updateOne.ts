import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryUpdateOneMutation = mutationField(
  'updateOneMedicalFormContactHistory',
  {
    type: nonNull('MedicalFormContactHistory'),
    args: {
      where: nonNull('MedicalFormContactHistoryWhereUniqueInput'),
      data: nonNull('MedicalFormContactHistoryUpdateInput'),
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
