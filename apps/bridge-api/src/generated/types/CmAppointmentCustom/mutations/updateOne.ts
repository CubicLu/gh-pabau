import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomUpdateOneMutation = mutationField(
  'updateOneCmAppointmentCustom',
  {
    type: nonNull('CmAppointmentCustom'),
    args: {
      where: nonNull('CmAppointmentCustomWhereUniqueInput'),
      data: nonNull('CmAppointmentCustomUpdateInput'),
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
