import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindManyQuery = queryField(
  'findManyCmAppointmentsCustomImportHelper',
  {
    type: nonNull(list(nonNull('CmAppointmentsCustomImportHelper'))),
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.findMany({
        ...args,
        ...select,
      })
    },
  },
)