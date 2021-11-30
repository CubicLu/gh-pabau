import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentCustomFindManyQuery = queryField(
  'findManyCmAppointmentCustom',
  {
    type: nonNull(list(nonNull('CmAppointmentCustom'))),
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.findMany({
        ...args,
        ...select,
      })
    },
  },
)
