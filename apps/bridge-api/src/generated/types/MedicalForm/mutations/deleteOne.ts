import { mutationField, nonNull } from 'nexus'

export const MedicalFormDeleteOneMutation = mutationField(
  'deleteOneMedicalForm',
  {
    type: 'MedicalForm',
    args: {
      where: nonNull('MedicalFormWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalForm.delete({
        where,
        ...select,
      })
    },
  },
)
