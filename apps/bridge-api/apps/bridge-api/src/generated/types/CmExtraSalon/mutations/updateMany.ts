import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonUpdateManyMutation = mutationField(
  'updateManyCmExtraSalon',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmExtraSalonWhereInput',
      data: nonNull('CmExtraSalonUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraSalon.updateMany(args as any)
    },
  },
)
