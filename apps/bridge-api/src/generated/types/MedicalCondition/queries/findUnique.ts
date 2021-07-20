import { queryField, nonNull } from 'nexus'

export const MedicalConditionFindUniqueQuery = queryField(
  'findUniqueMedicalCondition',
  {
    type: 'MedicalCondition',
    args: {
      where: nonNull('MedicalConditionWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.medicalCondition.findUnique({
        where,
        ...select,
      })
    },
  },
)
