import { mutationField, nonNull } from 'nexus'

export const UserMasterUpdateOneMutation = mutationField(
  'updateOneUserMaster',
  {
    type: nonNull('UserMaster'),
    args: {
      data: nonNull('UserMasterUpdateInput'),
      where: nonNull('UserMasterWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userMaster.update({
        where,
        data,
        ...select,
      })
    },
  },
)
