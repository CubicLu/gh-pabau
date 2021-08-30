import { queryField, list } from 'nexus'

export const CmAppointmentsCustomImportHelperAggregateQuery = queryField(
  'aggregateCmAppointmentsCustomImportHelper',
  {
    type: 'AggregateCmAppointmentsCustomImportHelper',
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
