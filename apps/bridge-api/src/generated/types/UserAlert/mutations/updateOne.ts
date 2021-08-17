import { mutationField, nonNull } from 'nexus'

export const UserAlertUpdateOneMutation = mutationField('updateOneUserAlert', {
  type: nonNull('UserAlert'),
  args: {
    where: nonNull('UserAlertWhereUniqueInput'),
    data: nonNull('UserAlertUpdateInput'),
  },
  resolve(_parent, { data, where }, { prisma, select }) {
    return prisma.userAlert.update({
      where,
      data,
      ...select,
    })
  },
})
