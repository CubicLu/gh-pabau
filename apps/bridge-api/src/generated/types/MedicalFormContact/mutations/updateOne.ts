import { mutationField, nonNull } from 'nexus'

export const MedicalFormContactUpdateOneMutation = mutationField(
  'updateOneMedicalFormContact',
  {
    type: nonNull('MedicalFormContact'),
    args: {
      data: nonNull('MedicalFormContactUpdateInput'),
      where: nonNull('MedicalFormContactWhereUniqueInput'),
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
