import { mutationField, nonNull } from 'nexus'

export const UserAlertTypeUpdateOneMutation = mutationField(
  'updateOneUserAlertType',
  {
    type: nonNull('UserAlertType'),
    args: {
      data: nonNull('UserAlertTypeUpdateInput'),
      where: nonNull('UserAlertTypeWhereUniqueInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.userAlertType.update({
        where,
        data,
        ...select,
      })
    },
  },
)
