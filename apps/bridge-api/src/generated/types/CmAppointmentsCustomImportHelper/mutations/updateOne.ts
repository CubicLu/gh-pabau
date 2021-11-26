import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperUpdateOneMutation = mutationField(
  'updateOneCmAppointmentsCustomImportHelper',
  {
    type: nonNull('CmAppointmentsCustomImportHelper'),
    args: {
      data: nonNull('CmAppointmentsCustomImportHelperUpdateInput'),
      where: nonNull('CmAppointmentsCustomImportHelperWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.update({
        where,
        data,
        ...select,
      })
    },
  },
)
