import { mutationField, nonNull } from 'nexus'

export const UserMasterUpdateManyMutation = mutationField(
  'updateManyUserMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      where: 'UserMasterWhereInput',
      data: nonNull('UserMasterUpdateManyMutationInput'),
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMaster.updateMany(args as any)
    },
  },
)
