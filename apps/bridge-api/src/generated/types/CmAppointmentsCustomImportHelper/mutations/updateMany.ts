import { mutationField, nonNull } from 'nexus'

export const CmAppointmentsCustomImportHelperUpdateManyMutation = mutationField(
  'updateManyCmAppointmentsCustomImportHelper',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmAppointmentsCustomImportHelperUpdateManyMutationInput'),
      where: 'CmAppointmentsCustomImportHelperWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentsCustomImportHelper.updateMany(args as any)
    },
  },
)
