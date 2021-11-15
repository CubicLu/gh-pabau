import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsUpdateOneMutation = mutationField(
  'updateOneCommunicationsRequestedForms',
  {
    type: nonNull('CommunicationsRequestedForms'),
    args: {
      where: nonNull('CommunicationsRequestedFormsWhereUniqueInput'),
      data: nonNull('CommunicationsRequestedFormsUpdateInput'),
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
