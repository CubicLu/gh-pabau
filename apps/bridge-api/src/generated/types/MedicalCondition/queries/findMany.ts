import { queryField, nonNull, list } from 'nexus'

export const MedicalConditionFindManyQuery = queryField(
  'findManyMedicalCondition',
  {
    type: nonNull(list(nonNull('MedicalCondition'))),
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByWithRelationInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalConditionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalCondition.findMany({
        ...args,
        ...select,
      })
    },
  },
)
