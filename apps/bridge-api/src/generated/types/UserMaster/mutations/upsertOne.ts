import { mutationField, nonNull } from 'nexus'

export const UserMasterUpsertOneMutation = mutationField(
  'upsertOneUserMaster',
  {
    type: nonNull('UserMaster'),
    args: {
      where: nonNull('UserMasterWhereUniqueInput'),
      create: nonNull('UserMasterCreateInput'),
      update: nonNull('UserMasterUpdateInput'),
    },
    resolve(_parent, args, { prisma, select }) {
      return prisma.userMaster.upsert({
        ...args,
        ...select,
      })
    },
  },
)
