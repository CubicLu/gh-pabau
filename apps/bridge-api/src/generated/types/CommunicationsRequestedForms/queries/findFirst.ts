import { queryField, list } from 'nexus'

export const CommunicationsRequestedFormsFindFirstQuery = queryField(
  'findFirstCommunicationsRequestedForms',
  {
    type: 'CommunicationsRequestedForms',
    args: {
      where: 'CommunicationsRequestedFormsWhereInput',
      orderBy: list('CommunicationsRequestedFormsOrderByWithRelationInput'),
      cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
      take: 'Int',
      skip: 'Int',
      distinct: list('CommunicationsRequestedFormsScalarFieldEnum'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.findFirst({
        ...args,
        ...select,
      })
    },
  },
)
