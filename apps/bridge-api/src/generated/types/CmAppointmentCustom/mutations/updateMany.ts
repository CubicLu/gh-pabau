import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomUpdateManyMutation = mutationField(
  'updateManyCmAppointmentCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmAppointmentCustomUpdateManyMutationInput'),
      where: 'CmAppointmentCustomWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentCustom.updateMany(args as any)
    },
  },
)
