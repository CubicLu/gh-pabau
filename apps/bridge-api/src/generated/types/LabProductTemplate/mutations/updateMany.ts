import { mutationField, nonNull } from 'nexus'

export const LabProductTemplateUpdateManyMutation = mutationField(
  'updateManyLabProductTemplate',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LabProductTemplateUpdateManyMutationInput'),
      where: 'LabProductTemplateWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labProductTemplate.updateMany(args as any)
    },
  },
)
