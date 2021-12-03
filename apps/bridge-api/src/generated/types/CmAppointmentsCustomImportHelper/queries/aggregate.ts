import { queryField, list } from 'nexus'

export const CmAppointmentsCustomImportHelperAggregateQuery = queryField(
  'aggregateCmAppointmentsCustomImportHelper',
  {
    type: 'AggregateCmAppointmentsCustomImportHelper',
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByWithRelationInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
