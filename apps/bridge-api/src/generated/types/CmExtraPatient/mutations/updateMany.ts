import { mutationField, nonNull } from 'nexus'

export const CmExtraPatientUpdateManyMutation = mutationField(
  'updateManyCmExtraPatient',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmExtraPatientUpdateManyMutationInput'),
      where: 'CmExtraPatientWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraPatient.updateMany(args as any)
    },
  },
)
