import { queryField, list } from 'nexus'

export const MedicalFormMacroAggregateQuery = queryField(
  'aggregateMedicalFormMacro',
  {
    type: 'AggregateMedicalFormMacro',
    args: {
      where: 'MedicalFormMacroWhereInput',
      orderBy: list('MedicalFormMacroOrderByWithRelationInput'),
      cursor: 'MedicalFormMacroWhereUniqueInput',
      distinct: 'MedicalFormMacroScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormMacro.aggregate({ ...args, ...select }) as any
    },
  },
)
