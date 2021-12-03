import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentsCustomImportHelperFindManyQuery = queryField(
  'findManyCmAppointmentsCustomImportHelper',
  {
    type: nonNull(list(nonNull('CmAppointmentsCustomImportHelper'))),
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      orderBy: list('CmAppointmentsCustomImportHelperOrderByWithRelationInput'),
      cursor: 'CmAppointmentsCustomImportHelperWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentsCustomImportHelperScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.findMany({
        ...args,
        ...select,
      })
    },
  },
)
