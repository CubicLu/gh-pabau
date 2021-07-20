import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomUpsertOneMutation = mutationField(
  'upsertOneCmAppointmentCustom',
  {
    type: nonNull('CmAppointmentCustom'),
    args: {
      where: nonNull('CmAppointmentCustomWhereUniqueInput'),
      create: nonNull('CmAppointmentCustomCreateInput'),
      update: nonNull('CmAppointmentCustomUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.upsert({
        ...args,
        ...select,
      })
    },
  },
)
