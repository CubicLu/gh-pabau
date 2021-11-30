import { queryField, list } from 'nexus'

export const CmStaffGeneralAggregateQuery = queryField(
  'aggregateCmStaffGeneral',
  {
    type: 'AggregateCmStaffGeneral',
    args: {
      where: 'CmStaffGeneralWhereInput',
      orderBy: list('CmStaffGeneralOrderByWithRelationInput'),
      cursor: 'CmStaffGeneralWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmStaffGeneral.aggregate({ ...args, ...select }) as any
    },
  },
)
