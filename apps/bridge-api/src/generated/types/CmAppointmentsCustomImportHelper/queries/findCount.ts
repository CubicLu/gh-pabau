import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindCountQuery = queryField(
  'findManyCmAppointmentsCustomImportHelperCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      distinct: 'CmAppointmentsCustomImportHelperScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentsCustomImportHelper.count(args as any)
    },
  },
)
