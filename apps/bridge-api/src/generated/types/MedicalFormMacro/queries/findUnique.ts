import { queryField, nonNull } from 'nexus'

export const MedicalFormMacroFindUniqueQuery = queryField(
  'findUniqueMedicalFormMacro',
  {
    type: 'MedicalFormMacro',
    args: {
      where: nonNull('MedicalFormMacroWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalFormMacro.findUnique({
        where,
        ...select,
      })
    },
  },
)
