import { objectType } from 'nexus'

export const CompanyService = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyService',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('name')
    t.string('duration')
    t.string('description')
    t.float('price')
    t.nullable.string('disabledusers')
    t.nullable.string('color')
    t.int('group_id')
    t.int('online_book')
    t.int('product_id')
    t.int('imported')
    t.int('communication_template')
    t.int('service_order')
    t.int('sms_mode')
    t.string('sms_name')
    t.int('sms_days_after')
    t.string('sms_send_time')
    t.int('sms_id')
    t.int('treatment_group_id')
    t.string('custom_id')
    t.int('pos_only')
    t.int('prep_time')
    t.int('finish_time')
    t.float('deposit_amount')
    t.string('friendly_name')
    t.int('max_clients')
    t.int('default_room_id')
    t.int('follow_up_period')
    t.field('deposit_type', { type: 'company_services_deposit_type' })
    t.int('max_models')
    t.field('availability', { type: 'company_services_availability' })
    t.int('force_credit_payment')
    t.string('disabled_locations')
    t.string('addon_services')
    t.nullable.string('service_participants')
    t.nullable.string('with_summary_title')
    t.field('online_book_type', { type: 'company_services_online_book_type' })
    t.string('proc_code')
    t.int('duration_day')
    t.nullable.string('invoice_text')
    t.nullable.string('invoice_item_name')
    t.int('online_only_service')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
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
    t.field('ServiceCategory', {
      type: 'ServiceCategory',
      resolve(root: any) {
        return root.ServiceCategory
      },
    })
    t.list.field('ServiceUserPrice', {
      type: 'ServiceUserPrice',
      args: {
        where: 'ServiceUserPriceWhereInput',
        orderBy: 'ServiceUserPriceOrderByWithRelationInput',
        cursor: 'ServiceUserPriceWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'ServiceUserPriceScalarFieldEnum',
      },
      resolve(root: any) {
        return root.ServiceUserPrice
      },
    })
    t.nullable.field('_count', {
      type: 'CompanyServiceCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
