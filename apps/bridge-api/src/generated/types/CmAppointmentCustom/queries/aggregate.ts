import { queryField, list } from 'nexus'

export const CmAppointmentCustomAggregateQuery = queryField(
  'aggregateCmAppointmentCustom',
  {
    type: 'AggregateCmAppointmentCustom',
    args: {
      where: 'CmAppointmentCustomWhereInput',
      orderBy: list('CmAppointmentCustomOrderByInput'),
      cursor: 'CmAppointmentCustomWhereUniqueInput',
      distinct: 'CmAppointmentCustomScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.cmAppointmentCustom.aggregate({ ...args, ...select }) as any
    },
  },
)
