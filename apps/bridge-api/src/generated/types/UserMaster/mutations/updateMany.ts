import { mutationField, nonNull } from 'nexus'

export const UserMasterUpdateManyMutation = mutationField(
  'updateManyUserMaster',
  {
    type: nonNull('BatchPayload'),
    args: {
      data: nonNull('UserMasterUpdateManyMutationInput'),
      where: 'UserMasterWhereInput',
    },
    resolve(_parent, args, { prisma }) {
      return prisma.userMaster.updateMany(args as any)
    },
  },
)
