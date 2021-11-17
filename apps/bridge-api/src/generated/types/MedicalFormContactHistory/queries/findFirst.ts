import { queryField, list } from 'nexus'

export const MedicalFormContactHistoryFindFirstQuery = queryField(
  'findFirstMedicalFormContactHistory',
  {
    type: 'MedicalFormContactHistory',
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
