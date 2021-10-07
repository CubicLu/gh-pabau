import { mutationField, nonNull } from 'nexus'

export const ClassMasterUpdateOneMutation = mutationField(
  'updateOneClassMaster',
  {
    type: nonNull('ClassMaster'),
    args: {
      where: nonNull('ClassMasterWhereUniqueInput'),
      data: nonNull('ClassMasterUpdateInput'),
    },
    resolve(_parent, { data, where }, { prisma, select }) {
      return prisma.classMaster.update({
        where,
        data,
        ...select,
      })
    },
  },
)
