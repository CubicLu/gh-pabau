import { queryField, nonNull, list } from 'nexus'

export const MedicalFormMacroFindManyQuery = queryField(
  'findManyMedicalFormMacro',
  {
    type: nonNull(list(nonNull('MedicalFormMacro'))),
    args: {
      where: 'MedicalFormMacroWhereInput',
      orderBy: list('MedicalFormMacroOrderByWithRelationInput'),
      cursor: 'MedicalFormMacroWhereUniqueInput',
      distinct: 'MedicalFormMacroScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormMacro.findMany({
        ...args,
        ...select,
      })
    },
  },
)
