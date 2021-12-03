import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactHistoryFindCountQuery = queryField(
  'findManyMedicalFormContactHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('MedicalFormContactHistoryScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContactHistory.count(args as any)
    },
  },
)
