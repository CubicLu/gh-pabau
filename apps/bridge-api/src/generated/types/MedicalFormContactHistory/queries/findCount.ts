import { queryField, nonNull, list } from 'nexus'

export const MedicalFormContactHistoryFindCountQuery = queryField(
  'findManyMedicalFormContactHistoryCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'MedicalFormContactHistoryWhereInput',
      orderBy: list('MedicalFormContactHistoryOrderByWithRelationInput'),
      cursor: 'MedicalFormContactHistoryWhereUniqueInput',
      distinct: 'MedicalFormContactHistoryScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.medicalFormContactHistory.count(args as any)
    },
  },
)
