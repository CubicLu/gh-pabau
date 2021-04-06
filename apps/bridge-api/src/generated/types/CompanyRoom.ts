import { objectType, arg, extendType } from 'nexus'

export const CompanyRoom = objectType({
  name: 'CompanyRoom',
  definition(t) {
    t.model.id()
    t.model.company_id()
    t.model.description()
    t.model.slots()
    t.model.all_services()
    t.model.is_active()
    t.model.all_locations()
    t.model.field_order()
    t.model.room_fee_type()
    t.model.room_fee()
    t.model.prod_id()
    t.model.imported()
    t.model.custom_id()
    t.model.Company()
    t.model.CompanyRoomLocation()
    t.model.CompanyRoomService()
    t.model.RotaShift()
  },
})

export const companyRoomQuery = extendType({
  type: 'Query',
  definition(t) {
    t.crud.companyRoom()
    t.field('findFirstCompanyRoom', {
      type: 'CompanyRoom',
      args: {
        where: 'CompanyRoomWhereInput',
        orderBy: arg({ type: 'CompanyRoomOrderByInput' }),
        cursor: 'CompanyRoomWhereUniqueInput',
        skip: 'Int',
        take: 'Int',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoom.findFirst(args as any)
      },
    })
    t.crud.companyRooms({ filtering: true, ordering: true })
    t.field('companyRoomsCount', {
      type: 'Int',
      args: {
        where: 'CompanyRoomWhereInput',
      },
      async resolve(_root, args, ctx) {
        return ctx.prisma.companyRoom.count(args as any)
      },
    })
  },
})

export const companyRoomMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.crud.createOneCompanyRoom()
    t.crud.updateOneCompanyRoom()
    t.crud.upsertOneCompanyRoom()
    t.crud.deleteOneCompanyRoom()
    t.crud.updateManyCompanyRoom()
  },
})
