import { queryField, list } from 'nexus'

export const CommunicationsRequestedFormsAggregateQuery = queryField(
  'aggregateCommunicationsRequestedForms',
  {
    type: 'AggregateCommunicationsRequestedForms',
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.aggregate({
        ...args,
        ...select,
      }) as any
    },
  },
)
