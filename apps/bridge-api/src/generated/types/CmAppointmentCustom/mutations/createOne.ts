import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomCreateOneMutation = mutationField(
  'createOneCmAppointmentCustom',
  {
    type: nonNull('CmAppointmentCustom'),
    args: {
      data: nonNull('CmAppointmentCustomCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.cmAppointmentCustom.create({
        data,
        ...select,
      })
    },
  },
)
