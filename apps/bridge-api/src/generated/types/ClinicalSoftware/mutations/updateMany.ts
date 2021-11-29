import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareUpdateManyMutation = mutationField(
  'updateManyClinicalSoftware',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('ClinicalSoftwareUpdateManyMutationInput'),
      where: 'ClinicalSoftwareWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clinicalSoftware.updateMany(args as any)
    },
  },
)
