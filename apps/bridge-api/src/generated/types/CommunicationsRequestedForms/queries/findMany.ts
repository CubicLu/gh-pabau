import { queryField, nonNull, list } from 'nexus'

export const CommunicationsRequestedFormsFindManyQuery = queryField(
  'findManyCommunicationsRequestedForms',
  {
    type: nonNull(list(nonNull('CommunicationsRequestedForms'))),
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationsRequestedFormsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.findMany({
        ...args,
        ...select,
      })
    },
  },
)
