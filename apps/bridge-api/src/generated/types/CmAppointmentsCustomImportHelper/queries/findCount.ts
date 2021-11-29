import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindCountQuery = queryField(
  'findManyCmAppointmentsCustomImportHelperCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByWithRelationInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentsCustomImportHelperScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentsCustomImportHelper.count(args as any)
    },
  },
)
