import { queryField, list } from 'nexus'

export const MedicalFormContactAggregateQuery = queryField(
  'aggregateMedicalFormContact',
  {
    type: 'AggregateMedicalFormContact',
    args: {
      where: 'MedicalFormContactWhereInput',
      orderBy: list('MedicalFormContactOrderByInput'),
      cursor: 'MedicalFormContactWhereUniqueInput',
      distinct: 'MedicalFormContactScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.medicalFormContact.aggregate({ ...args, ...select }) as any
    },
  },
)
