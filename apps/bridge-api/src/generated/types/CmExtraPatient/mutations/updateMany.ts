import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientUpdateManyMutation = mutationField(
  'updateManyCmExtraPatient',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmExtraPatientWhereInput',
      data: nonNull('CmExtraPatientUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraPatient.updateMany(args as any)
    },
  },
)
