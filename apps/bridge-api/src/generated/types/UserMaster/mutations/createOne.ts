import { mutationField, nonNull } from 'nexus'

export const UserMasterCreateOneMutation = mutationField(
  'createOneUserMaster',
  {
    type: nonNull('UserMaster'),
    args: {
      data: nonNull('UserMasterCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userMaster.create({
        data,
        ...select,
      })
    },
  },
)
