import { queryField, nonNull, list } from 'nexus'

export const MedicalConditionFindCountQuery = queryField(
  'findManyMedicalConditionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByWithRelationInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalConditionScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalCondition.count(args as any)
    },
  },
)
