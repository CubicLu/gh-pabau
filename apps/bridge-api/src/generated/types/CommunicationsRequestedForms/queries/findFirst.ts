import { queryField, list } from 'nexus'

export const CommunicationsRequestedFormsFindFirstQuery = queryField(
  'findFirstCommunicationsRequestedForms',
  {
    type: 'CommunicationsRequestedForms',
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      skip: 'Int',
      take: 'Int',
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
