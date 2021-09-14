import { queryField, list } from 'nexus'

export const MedicalFormMacroFindFirstQuery = queryField(
  'findFirstMedicalFormMacro',
  {
    type: 'MedicalFormMacro',
    args: {
      where: 'MedicalFormMacroWhereInput',
      orderBy: list('MedicalFormMacroOrderByWithRelationInput'),
      cursor: 'MedicalFormMacroWhereUniqueInput',
      distinct: 'MedicalFormMacroScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormMacro.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
