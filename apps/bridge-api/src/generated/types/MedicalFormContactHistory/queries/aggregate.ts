import { queryField, list } from 'nexus'

export const MedicalFormContactHistoryAggregateQuery = queryField(
  'aggregateMedicalFormContactHistory',
  {
    type: 'AggregateMedicalFormContactHistory',
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
