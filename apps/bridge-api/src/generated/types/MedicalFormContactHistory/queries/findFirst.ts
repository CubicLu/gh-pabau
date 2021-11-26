import { queryField, list } from 'nexus'

export const MedicalFormContactHistoryFindFirstQuery = queryField(
  'findFirstMedicalFormContactHistory',
  {
    type: 'MedicalFormContactHistory',
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContactHistory.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
