import { queryField, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindFirstQuery = queryField(
  'findFirstCmAppointmentsCustomImportHelper',
  {
    type: 'CmAppointmentsCustomImportHelper',
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
