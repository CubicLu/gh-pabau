import { mutationField, nonNull } from 'nexus'

export const LabRequestUpdateManyMutation = mutationField(
  'updateManyLabRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'LabRequestWhereInput',
      data: nonNull('LabRequestUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labRequest.updateMany(args as any)
    },
  },
)
