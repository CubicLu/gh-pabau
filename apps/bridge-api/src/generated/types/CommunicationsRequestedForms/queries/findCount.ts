import { queryField, nonNull, list } from 'nexus'

export const CommunicationsRequestedFormsFindCountQuery = queryField(
  'findManyCommunicationsRequestedFormsCount',
  {
    type: nonNull('Int'),
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.communicationsRequestedForms.count(args as any)
    },
  },
)
