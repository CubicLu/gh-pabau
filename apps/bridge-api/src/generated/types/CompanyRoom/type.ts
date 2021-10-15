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
        orderBy: 'CompanyRoomLocationOrderByInput',
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
        orderBy: 'CompanyRoomServiceOrderByInput',
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
        orderBy: 'RotaShiftOrderByInput',
        cursor: 'RotaShiftWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'RotaShiftScalarFieldEnum',
      },
      resolve(root: any) {
        return root.RotaShift
      },
    })
  },
})
