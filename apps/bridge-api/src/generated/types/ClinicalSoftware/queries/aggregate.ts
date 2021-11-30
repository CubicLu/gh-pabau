import { queryField, list } from 'nexus'

export const ClinicalSoftwareAggregateQuery = queryField(
  'aggregateClinicalSoftware',
  {
    type: 'AggregateClinicalSoftware',
    args: {
      where: 'ClinicalSoftwareWhereInput',
      orderBy: list('ClinicalSoftwareOrderByWithRelationInput'),
      cursor: 'ClinicalSoftwareWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.clinicalSoftware.aggregate({ ...args, ...select }) as any
    },
  },
)
