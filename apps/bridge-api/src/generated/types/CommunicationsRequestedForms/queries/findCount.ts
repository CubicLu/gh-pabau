import { queryField, nonNull, list } from 'nexus'

export const CommunicationsRequestedFormsFindCountQuery = queryField(
  'findManyCommunicationsRequestedFormsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationsRequestedFormsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationsRequestedForms.count(args as any)
    },
  },
)
