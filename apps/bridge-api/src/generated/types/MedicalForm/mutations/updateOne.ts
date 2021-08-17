import { mutationField, nonNull } from 'nexus'

export const MedicalFormUpdateOneMutation = mutationField(
  'updateOneMedicalForm',
  {
    type: nonNull('MedicalForm'),
    args: {
      where: nonNull('MedicalFormWhereUniqueInput'),
      data: nonNull('MedicalFormUpdateInput'),
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
