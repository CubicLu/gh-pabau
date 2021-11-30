import { queryField, list } from 'nexus'

export const CmExtraPatientAggregateQuery = queryField(
  'aggregateCmExtraPatient',
  {
    type: 'AggregateCmExtraPatient',
    args: {
      where: 'CmExtraPatientWhereInput',
      orderBy: list('CmExtraPatientOrderByWithRelationInput'),
      cursor: 'CmExtraPatientWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmExtraPatient.aggregate({ ...args, ...select }) as any
    },
  },
)
