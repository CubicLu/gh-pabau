import { mutationField, nonNull } from 'nexus'

export const LeadStatusDeleteOneMutation = mutationField(
  'deleteOneLeadStatus',
  {
    type: 'LeadStatus',
    args: {
      where: nonNull('LeadStatusWhereUniqueInput'),
    },
    resolve: async (_parent, { where }, { prisma, select }) => {
      return prisma.leadStatus.delete({
        where,
        ...select,
      })
    },
  },
)
