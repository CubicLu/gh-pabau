import { mutationField, nonNull } from 'nexus'

export const ClinicalSoftwareUpdateManyMutation = mutationField(
  'updateManyClinicalSoftware',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'ClinicalSoftwareWhereInput',
      data: nonNull('ClinicalSoftwareUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.clinicalSoftware.updateMany(args as any)
    },
  },
)
