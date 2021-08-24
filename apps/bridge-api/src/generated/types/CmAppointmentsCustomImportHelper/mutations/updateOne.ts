import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperUpdateOneMutation = mutationField(
  'updateOneCmAppointmentsCustomImportHelper',
  {
    type: nonNull('CmAppointmentsCustomImportHelper'),
    args: {
      where: nonNull('CmAppointmentsCustomImportHelperWhereUniqueInput'),
      data: nonNull('CmAppointmentsCustomImportHelperUpdateInput'),
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
