import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeCreateOneMutation = mutationField(
  'createOneUserAlertType',
  {
    type: nonNull('UserAlertType'),
    args: {
      data: nonNull('UserAlertTypeCreateInput'),
    },
    resolve(_parent, { data }, { prisma, select }) {
      return prisma.userAlertType.create({
        data,
        ...select,
      })
    },
  },
)
