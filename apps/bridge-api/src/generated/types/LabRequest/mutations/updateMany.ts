import { mutationField, nonNull } from 'nexus'

export const LabRequestUpdateManyMutation = mutationField(
  'updateManyLabRequest',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('LabRequestUpdateManyMutationInput'),
      where: 'LabRequestWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.labRequest.updateMany(args as any)
    },
  },
)
