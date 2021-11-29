import { mutationField, nonNull } from 'nexus'

export const UserAlertUpdateOneMutation = mutationField('updateOneUserAlert', {
  type: nonNull('UserAlert'),
  args: {
    data: nonNull('UserAlertUpdateInput'),
    where: nonNull('UserAlertWhereUniqueInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.userAlert.update({
      where,
      data,
      ...select,
    })
  },
})
