import { queryField, nonNull, list } from 'nexus'

export const MedicalConditionFindCountQuery = queryField(
  'findManyMedicalConditionCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      distinct: 'MedicalConditionScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalCondition.count(args as any)
    },
  },
)
