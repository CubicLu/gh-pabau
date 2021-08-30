import { mutationField, nonNull } from 'nexus'

export const UserMasterUpdateOneMutation = mutationField(
  'updateOneUserMaster',
  {
    type: nonNull('UserMaster'),
    args: {
      where: nonNull('UserMasterWhereUniqueInput'),
      data: nonNull('UserMasterUpdateInput'),
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
