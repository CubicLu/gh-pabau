import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralUpdateManyMutation = mutationField(
  'updateManyCmStaffGeneral',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('CmStaffGeneralUpdateManyMutationInput'),
      where: 'CmStaffGeneralWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmStaffGeneral.updateMany(args as any)
    },
  },
)
