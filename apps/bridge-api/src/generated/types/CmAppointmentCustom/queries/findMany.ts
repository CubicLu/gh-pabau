import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentCustomFindManyQuery = queryField(
  'findManyCmAppointmentCustom',
  {
    type: nonNull(list(nonNull('CmAppointmentCustom'))),
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      distinct: 'CmAppointmentCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.findMany({
        ...args,
        ...select,
      })
    },
  },
)
