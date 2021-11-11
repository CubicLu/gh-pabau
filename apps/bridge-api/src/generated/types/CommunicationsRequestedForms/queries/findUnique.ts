import { queryField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsFindUniqueQuery = queryField(
  'findUniqueCommunicationsRequestedForms',
  {
    type: 'CommunicationsRequestedForms',
    args: {
      where: nonNull('CommunicationsRequestedFormsWhereUniqueInput'),
    },
    resolve(_parent, { where }, { prisma, select }) {
      return prisma.communicationsRequestedForms.findUnique({
        where,
        ...select,
      })
    },
  },
)
