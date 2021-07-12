import { queryField, nonNull } from 'nexus'

export const CmAppointmentCustomFindUniqueQuery = queryField(
  'findUniqueCmAppointmentCustom',
  {
    type: 'CmAppointmentCustom',
    args: {
      where: nonNull('CmAppointmentCustomWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.cmAppointmentCustom.findUnique({
        where,
        ...select,
      })
    },
  },
)
