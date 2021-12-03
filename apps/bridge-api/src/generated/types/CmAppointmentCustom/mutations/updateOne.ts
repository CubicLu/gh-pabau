import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomUpdateOneMutation = mutationField(
  'updateOneCmAppointmentCustom',
  {
    type: nonNull('CmAppointmentCustom'),
    args: {
      data: nonNull('CmAppointmentCustomUpdateInput'),
      where: nonNull('CmAppointmentCustomWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.cmAppointmentCustom.update({
        where,
        data,
        ...select,
      })
    },
  },
)
