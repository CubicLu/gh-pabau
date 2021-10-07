import { mutationField, nonNull } from 'nexus'

export const MedicalFormCreateOneMutation = mutationField(
  'createOneMedicalForm',
  {
    type: nonNull('MedicalForm'),
    args: {
      data: nonNull('MedicalFormCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalForm.create({
        data,
        ...select,
      })
    },
  },
)
