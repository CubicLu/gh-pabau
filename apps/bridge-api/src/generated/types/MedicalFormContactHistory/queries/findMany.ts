import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactHistoryFindManyQuery = queryField(
  'findManyMedicalFormContactHistory',
  {
    type: nonNull(list(nonNull('MedicalFormContactHistory'))),
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
