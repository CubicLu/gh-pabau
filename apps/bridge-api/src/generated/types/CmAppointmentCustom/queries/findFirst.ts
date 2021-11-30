import { queryField, list } from 'nexus'

export const CmAppointmentCustomFindFirstQuery = queryField(
  'findFirstCmAppointmentCustom',
  {
    type: 'CmAppointmentCustom',
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
