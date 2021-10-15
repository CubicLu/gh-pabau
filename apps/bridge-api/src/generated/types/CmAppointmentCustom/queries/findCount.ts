import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentCustomFindCountQuery = queryField(
  'findManyCmAppointmentCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      distinct: 'CmAppointmentCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentCustom.count(args as any)
    },
  },
)
