import { queryField, list } from 'nexus'

export const MedicalConditionFindFirstQuery = queryField(
  'findFirstMedicalCondition',
  {
    type: 'MedicalCondition',
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      distinct: 'MedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalCondition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
