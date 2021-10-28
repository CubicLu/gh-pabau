import { queryField, list } from 'nexus'

export const MedicalFormContactHistoryAggregateQuery = queryField(
  'aggregateMedicalFormContactHistory',
  {
    type: 'AggregateMedicalFormContactHistory',
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
