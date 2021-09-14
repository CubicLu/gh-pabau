import { queryField, nonNull, list } from 'nexus'

export const MedicalFormMacroFindCountQuery = queryField(
  'findManyMedicalFormMacroCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormMacroWhereInput',
      orderBy: list('MedicalFormMacroOrderByWithRelationInput'),
      cursor: 'MedicalFormMacroWhereUniqueInput',
      distinct: 'MedicalFormMacroScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormMacro.count(args as any)
    },
  },
)
