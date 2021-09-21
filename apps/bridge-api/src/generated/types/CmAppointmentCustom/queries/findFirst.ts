import { queryField, list } from 'nexus'

export const CmAppointmentCustomFindFirstQuery = queryField(
  'findFirstCmAppointmentCustom',
  {
    type: 'CmAppointmentCustom',
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      distinct: 'CmAppointmentCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
