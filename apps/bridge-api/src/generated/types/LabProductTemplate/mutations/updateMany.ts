import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateUpdateManyMutation = mutationField(
  'updateManyLabProductTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LabProductTemplateWhereInput',
      data: nonNull('LabProductTemplateUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labProductTemplate.updateMany(args as any)
    },
  },
)
