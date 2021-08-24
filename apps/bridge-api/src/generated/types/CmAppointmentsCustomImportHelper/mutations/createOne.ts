import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperCreateOneMutation = mutationField(
  'createOneCmAppointmentsCustomImportHelper',
  {
    type: nonNull('CmAppointmentsCustomImportHelper'),
    args: {
      data: nonNull('CmAppointmentsCustomImportHelperCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.create({
        data,
        ...select,
      })
    },
  },
)
