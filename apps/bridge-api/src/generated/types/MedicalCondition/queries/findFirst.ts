import { queryField, list } from 'nexus'

export const MedicalConditionFindFirstQuery = queryField(
  'findFirstMedicalCondition',
  {
    type: 'MedicalCondition',
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByWithRelationInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalConditionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalCondition.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
