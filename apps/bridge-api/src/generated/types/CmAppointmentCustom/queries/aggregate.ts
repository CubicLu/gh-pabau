import { queryField, list } from 'nexus'

export const CmAppointmentCustomAggregateQuery = queryField(
  'aggregateCmAppointmentCustom',
  {
    type: 'AggregateCmAppointmentCustom',
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByWithRelationInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.aggregate({ ...args, ...select }) as any
    },
  },
)
