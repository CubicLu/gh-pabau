import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomUpdateManyMutation = mutationField(
  'updateManyCmAppointmentCustom',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmAppointmentCustomWhereInput',
      data: nonNull('CmAppointmentCustomUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentCustom.updateMany(args as any)
    },
  },
)
