import { mutationField, nonNull } from 'nexus'

export const CmAppointmentCustomDeleteOneMutation = mutationField(
  'deleteOneCmAppointmentCustom',
  {
    type: 'CmAppointmentCustom',
    args: {
      where: nonNull('CmAppointmentCustomWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.cmAppointmentCustom.delete({
        where,
        ...select,
      })
    },
  },
)
