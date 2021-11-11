import { queryField, nonNull } from 'nexus'

export const MedicalFormContactHistoryFindUniqueQuery = queryField(
  'findUniqueMedicalFormContactHistory',
  {
    type: 'MedicalFormContactHistory',
    args: {
      where: nonNull('MedicalFormContactHistoryWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalFormContactHistory.findUnique({
        where,
        ...select,
      })
    },
  },
)
