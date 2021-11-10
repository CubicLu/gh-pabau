import { queryField, nonNull, list } from 'nexus'

export const CommunicationsRequestedFormsFindManyQuery = queryField(
  'findManyCommunicationsRequestedForms',
  {
    type: nonNull(list(nonNull('CommunicationsRequestedForms'))),
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.findMany({
        ...args,
        ...select,
      })
    },
  },
)
