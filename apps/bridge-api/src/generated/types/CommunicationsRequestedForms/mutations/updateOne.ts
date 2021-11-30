import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsUpdateOneMutation = mutationField(
  'updateOneCommunicationsRequestedForms',
  {
    type: nonNull('CommunicationsRequestedForms'),
    args: {
      data: nonNull('CommunicationsRequestedFormsUpdateInput'),
      where: nonNull('CommunicationsRequestedFormsWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.communicationsRequestedForms.update({
        where,
        data,
        ...select,
      })
    },
  },
)
