import { mutationField, nonNull } from 'nexus'

export const MedicalFormMacroCreateOneMutation = mutationField(
  'createOneMedicalFormMacro',
  {
    type: nonNull('MedicalFormMacro'),
    args: {
      data: nonNull('MedicalFormMacroCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.medicalFormMacro.create({
        data,
        ...select,
      })
    },
  },
)
