import { mutationField, nonNull } from 'nexus'

export const MedicalFormMacroUpdateOneMutation = mutationField(
  'updateOneMedicalFormMacro',
  {
    type: nonNull('MedicalFormMacro'),
    args: {
      where: nonNull('MedicalFormMacroWhereUniqueInput'),
      data: nonNull('MedicalFormMacroUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.medicalFormMacro.update({
        where,
        data,
        ...select,
      })
    },
  },
)
