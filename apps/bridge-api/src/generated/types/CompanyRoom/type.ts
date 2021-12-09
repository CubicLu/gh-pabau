import { objectType } from 'nexus'

export const CompanyRoom = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyRoom',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('description')
    t.int('slots')
    t.int('all_services')
    t.int('is_active')
    t.boolean('all_locations')
    t.int('field_order')
    t.string('room_fee_type')
    t.float('room_fee')
    t.int('prod_id')
    t.int('imported')
    t.string('custom_id')
    t.nullable.field('deleted_at', { type: 'DateTime' })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('CompanyRoomLocation', {
      type: 'CompanyRoomLocation',
      args: {
        where: 'CompanyRoomLocationWhereInput',
        orderBy: 'CompanyRoomLocationOrderByWithRelationInput',
        cursor: 'CompanyRoomLocationWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomLocationScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoomLocation
      },
    })
    t.list.field('CompanyRoomService', {
      type: 'CompanyRoomService',
      args: {
        where: 'CompanyRoomServiceWhereInput',
        orderBy: 'CompanyRoomServiceOrderByWithRelationInput',
        cursor: 'CompanyRoomServiceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CompanyRoomServiceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CompanyRoomService
      },
    })
    t.list.field('RotaShift', {
      type: 'RotaShift',
      args: {
        where: 'RotaShiftWhereInput',
        orderBy: 'RotaShiftOrderByWithRelationInput',
        cursor: 'RotaShiftWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RotaShiftScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RotaShift
      },
    })
    t.nullable.field('_count', {
      type: 'CompanyRoomCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
