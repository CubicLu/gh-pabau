import { mutationField, nonNull } from 'nexus'

export const CmStaffGeneralUpdateManyMutation = mutationField(
  'updateManyCmStaffGeneral',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'CmStaffGeneralWhereInput',
      data: nonNull('CmStaffGeneralUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.cmStaffGeneral.updateMany(args as any)
    },
  },
)
