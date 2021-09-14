import { mutationField, nonNull } from 'nexus'

export const MedicalFormMacroUpdateManyMutation = mutationField(
  'updateManyMedicalFormMacro',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'MedicalFormMacroWhereInput',
      data: nonNull('MedicalFormMacroUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormMacro.updateMany(args as any)
    },
  },
)
