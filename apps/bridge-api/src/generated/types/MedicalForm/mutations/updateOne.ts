import { mutationField, nonNull } from 'nexus'

export const MedicalFormUpdateOneMutation = mutationField(
  'updateOneMedicalForm',
  {
    type: nonNull('MedicalForm'),
    args: {
      data: nonNull('MedicalFormUpdateInput'),
      where: nonNull('MedicalFormWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalForm.update({
        where,
        data,
        ...select,
      })
    },
  },
)
