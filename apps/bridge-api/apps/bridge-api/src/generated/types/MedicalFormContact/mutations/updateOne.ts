import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactUpdateOneMutation = mutationField(
  'updateOneMedicalFormContact',
  {
    type: nonNull('MedicalFormContact'),
    args: {
      where: nonNull('MedicalFormContactWhereUniqueInput'),
      data: nonNull('MedicalFormContactUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalFormContact.update({
        where,
        data,
        ...select,
      })
    },
  },
)
