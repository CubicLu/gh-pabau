import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperUpdateManyMutation = mutationField(
  'updateManyCmAppointmentsCustomImportHelper',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmAppointmentsCustomImportHelperWhereInput',
      data: nonNull('CmAppointmentsCustomImportHelperUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentsCustomImportHelper.updateMany(args as any)
    },
  },
)
