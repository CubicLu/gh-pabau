import { queryField, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindFirstQuery = queryField(
  'findFirstCmAppointmentsCustomImportHelper',
  {
    type: 'CmAppointmentsCustomImportHelper',
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByWithRelationInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentsCustomImportHelperScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
