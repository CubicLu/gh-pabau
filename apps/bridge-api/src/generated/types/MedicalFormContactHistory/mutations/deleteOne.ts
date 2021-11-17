import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactHistoryDeleteOneMutation = mutationField(
  'deleteOneMedicalFormContactHistory',
  {
    type: 'MedicalFormContactHistory',
    args: {
      where: nonNull('MedicalFormContactHistoryWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalFormContactHistory.delete({
        where,
        ...select,
      })
    },
  },
)
