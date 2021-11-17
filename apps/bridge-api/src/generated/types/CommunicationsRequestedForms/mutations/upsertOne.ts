import { mutationField, nonNull } from 'nexus'

export const CommunicationsRequestedFormsUpsertOneMutation = mutationField(
  'upsertOneCommunicationsRequestedForms',
  {
    type: nonNull('CommunicationsRequestedForms'),
    args: {
      where: nonNull('CommunicationsRequestedFormsWhereUniqueInput'),
      create: nonNull('CommunicationsRequestedFormsCreateInput'),
      update: nonNull('CommunicationsRequestedFormsUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.communicationsRequestedForms.upsert({
        ...args,
        ...select,
      })
    },
  },
)
