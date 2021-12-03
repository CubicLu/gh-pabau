import { queryField, list } from 'nexus'

export const MedicalConditionAggregateQuery = queryField(
  'aggregateMedicalCondition',
  {
    type: 'AggregateMedicalCondition',
    args: {
      where: 'MedicalConditionWhereInput',
      orderBy: list('MedicalConditionOrderByWithRelationInput'),
      cursor: 'MedicalConditionWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalCondition.aggregate({ ...args, ...select }) as any
    },
  },
)
