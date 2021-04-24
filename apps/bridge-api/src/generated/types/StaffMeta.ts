import { objectType, arg, extendType } from 'nexus'

export const StaffMeta = objectType({
  name: 'StaffMeta',
  definition(t) {
    t.model.id()
    t.model.staff_id()
    t.model.meta_name()
    t.model.meta_value()
    t.model.User()
  },
})

export const staffMetaQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.staffMeta()
    t.field('findFirstStaffMeta', {
      type: 'StaffMeta',
      args: {
        where: 'StaffMetaWhereInput',
        orderBy: arg({ type: 'StaffMetaOrderByInput' }),
        cursor: 'StaffMetaWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.staffMeta.findFirst(args as any)
      },
    })
    t.crud.staffMetas({ filtering: true, ordering: true })
    t.field('staffMetasCount', {
      type: 'Int',
      args: {
        where: 'StaffMetaWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.staffMeta.count(args as any)
      },
    })
  },
})

export const staffMetaMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneStaffMeta()
    t.crud.updateOneStaffMeta()
    t.crud.upsertOneStaffMeta()
    t.crud.deleteOneStaffMeta()
  },
})
