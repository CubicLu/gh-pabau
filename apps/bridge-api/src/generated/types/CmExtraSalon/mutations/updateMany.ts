import { mutationField, nonNull } from 'nexus'

export const CmExtraSalonUpdateManyMutation = mutationField(
  'updateManyCmExtraSalon',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmExtraSalonUpdateManyMutationInput'),
      where: 'CmExtraSalonWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmExtraSalon.updateMany(args as any)
    },
  },
)
