import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperUpsertOneMutation = mutationField(
  'upsertOneCmAppointmentsCustomImportHelper',
  {
    type: nonNull('CmAppointmentsCustomImportHelper'),
    args: {
      where: nonNull('CmAppointmentsCustomImportHelperWhereUniqueInput'),
      create: nonNull('CmAppointmentsCustomImportHelperCreateInput'),
      update: nonNull('CmAppointmentsCustomImportHelperUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentsCustomImportHelper.upsert({
        ...args,
        ...select,
      })
    },
  },
)
