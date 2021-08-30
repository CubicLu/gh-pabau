import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactDeleteOneMutation = mutationField(
  'deleteOneMedicalFormContact',
  {
    type: 'MedicalFormContact',
    args: {
      where: nonNull('MedicalFormContactWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalFormContact.delete({
        where,
        ...select,
      })
    },
  },
)
