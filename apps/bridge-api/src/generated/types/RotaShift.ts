import { objectType, arg, extendType } from 'nexus'

export const RotaShift = objectType({
  name: 'RotaShift',
  definition(t) {
    t.model.id()
    t.model.uid()
    t.model.User()
    t.model.start()
    t.model.end()
    t.model.company_id()
    t.model.notes()
    t.model.last_seen()
    t.model.last_modified()
    t.model.last_notified()
    t.model.last_published()
    t.model.first_created()
    t.model.user_created()
    t.model.repeat_id()
    t.model.reason_code()
    t.model.reason_data()
    t.model.holiday_id()
    t.model.cal_id()
    t.model.is_cal()
    t.model.note_color()
    t.model.location_id()
    t.model.request()
    t.model.sickness()
    t.model.imported()
    t.model.tag_name()
    t.model.room_id()
    t.model.force_created()
    t.model.Company()
    t.model.Location()
  },
})

export const rotaShiftQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.rotaShift()
    t.field('findFirstRotaShift', {
      type: 'RotaShift',
      args: {
        where: 'RotaShiftWhereInput',
        orderBy: arg({ type: 'RotaShiftOrderByInput' }),
        cursor: 'RotaShiftWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.rotaShift.findFirst(args as any)
      },
    })
    t.crud.rotaShifts({ filtering: true, ordering: true })
    t.field('rotaShiftsCount', {
      type: 'Int',
      args: {
        where: 'RotaShiftWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.rotaShift.count(args as any)
      },
    })
  },
})

export const rotaShiftMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneRotaShift()
    t.crud.updateOneRotaShift()
    t.crud.upsertOneRotaShift()
    t.crud.deleteOneRotaShift()
    t.crud.updateManyRotaShift()
  },
})
