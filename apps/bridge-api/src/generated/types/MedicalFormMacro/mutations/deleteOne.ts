import { mutationField, nonNull } from 'nexus'

export const MedicalFormMacroDeleteOneMutation = mutationField(
  'deleteOneMedicalFormMacro',
  {
    type: 'MedicalFormMacro',
    args: {
      where: nonNull('MedicalFormMacroWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.medicalFormMacro.delete({
        where,
        ...select,
      })
    },
  },
)
