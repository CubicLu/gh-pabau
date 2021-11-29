import { queryField, nonNull, list } from 'nexus'

export const CmAppointmentCustomFindCountQuery = queryField(
  'findManyCmAppointmentCustomCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CmAppointmentCustomScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmAppointmentCustom.count(args as any)
    },
  },
)
