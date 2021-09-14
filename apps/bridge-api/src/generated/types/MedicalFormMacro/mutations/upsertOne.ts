import { mutationField, nonNull } from 'nexus'

export const MedicalFormMacroUpsertOneMutation = mutationField(
  'upsertOneMedicalFormMacro',
  {
    type: nonNull('MedicalFormMacro'),
    args: {
      where: nonNull('MedicalFormMacroWhereUniqueInput'),
      create: nonNull('MedicalFormMacroCreateInput'),
      update: nonNull('MedicalFormMacroUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormMacro.upsert({
        ...args,
        ...select,
      })
    },
  },
)
