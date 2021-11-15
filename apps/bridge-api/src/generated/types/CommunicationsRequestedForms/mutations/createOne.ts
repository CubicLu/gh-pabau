import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsCreateOneMutation = mutationField(
  'createOneCommunicationsRequestedForms',
  {
    type: nonNull('CommunicationsRequestedForms'),
    args: {
      data: nonNull('CommunicationsRequestedFormsCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.communicationsRequestedForms.create({
        data,
        ...select,
      })
    },
  },
)
