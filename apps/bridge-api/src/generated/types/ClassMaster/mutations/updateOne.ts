import { mutationField, nonNull } from 'nexus'

export const ClassMasterUpdateOneMutation = mutationField(
  'updateOneClassMaster',
  {
    type: nonNull('ClassMaster'),
    args: {
      data: nonNull('ClassMasterUpdateInput'),
      where: nonNull('ClassMasterWhereUniqueInput'),
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
