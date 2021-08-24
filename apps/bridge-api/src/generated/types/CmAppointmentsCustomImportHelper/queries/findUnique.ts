import { queryField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperFindUniqueQuery = queryField(
  'findUniqueCmAppointmentsCustomImportHelper',
  {
    type: 'CmAppointmentsCustomImportHelper',
    args: {
      where: nonNull('CmAppointmentsCustomImportHelperWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.findUnique({
        where,
        ...select,
      })
    },
  },
)
