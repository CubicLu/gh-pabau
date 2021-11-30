import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactHistoryFindManyQuery = queryField(
  'findManyMedicalFormContactHistory',
  {
    type: nonNull(list(nonNull('MedicalFormContactHistory'))),
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.findMany({
        ...args,
        ...select,
      })
    },
  },
)
