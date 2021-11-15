import { objectType } from 'nexus'

export const Booking = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'Booking',
  definition(t) {
    t.int('id')
    t.string('title')
    t.float('start_date')
    t.float('end_date')
    t.nullable.int('start_time')
    t.nullable.int('end_time')
    t.nullable.string('service')
    t.nullable.int('contact_id')
    t.int('UID')
    t.int('company_id')
    t.nullable.string('backgroudcolor')
    t.nullable.float('create_date')
    t.nullable.float('update_date')
    t.string('status')
    t.nullable.float('estimated_cost')
    t.nullable.float('tips')
    t.nullable.float('discounts')
    t.nullable.string('where')
    t.nullable.int('room_id')
    t.string('unique_id')
    t.nullable.string('reason')
    t.nullable.int('invoice_id')
    t.nullable.int('booking_id')
    t.nullable.int('Online')
    t.nullable.int('package_id')
    t.nullable.int('cancel_take')
    t.nullable.int('book_take')
    t.nullable.int('class_master_id')
    t.nullable.int('unavailable')
    t.nullable.string('coupon_claim_id')
    t.nullable.int('related_id')
    t.int('service_id')
    t.nullable.int('rebook')
    t.nullable.int('repeat_id')
    t.nullable.int('requested')
    t.nullable.int('sent_sms')
    t.nullable.int('sent_email')
    t.nullable.int('sent_survey')
    t.nullable.int('custom_contact_id')
    t.nullable.string('custom_contact_name')
    t.nullable.string('custom_user_id')
    t.nullable.string('custom_user_name')
    t.nullable.string('custom_service_id')
    t.nullable.int('imported')
    t.nullable.int('client_confirmed')
    t.nullable.string('hold_guid')
    t.nullable.int('created_by_uid')
    t.nullable.int('marketing_source')
    t.nullable.int('resource_id')
    t.nullable.string('custom_room_name')
    t.nullable.string('custom_created_by_user_name')
    t.int('location_id')
    t.nullable.int('modified_by_uid')
    t.nullable.boolean('sent_email_reminder')
    t.nullable.int('disable_locations')
    t.nullable.int('participant_master_uid')
    t.nullable.int('participant_master_booking_id')
    t.nullable.string('participant_slave_uids')
    t.nullable.string('participant_slave_booking_ids')
    t.nullable.int('private')
    t.nullable.string('external_guest_ids')
    t.nullable.string('description')
    t.nullable.int('issued_to')
    t.nullable.int('contract_id')
    t.nullable.int('all_day')
    t.nullable.int('interlinked_master_uid')
    t.nullable.int('all_day_start_date')
    t.nullable.int('all_day_end_date')
    t.nullable.field('InvSale', {
      type: 'InvSale',
      resolve(root: any) {
        return root.InvSale
      },
    })
    t.nullable.field('User', {
      type: 'User',
      resolve(root: any) {
        return root.User
      },
    })
    t.nullable.field('Contact', {
      type: 'CmContact',
      resolve(root: any) {
        return root.Contact
      },
    })
    t.nullable.field('UserMaster', {
      type: 'UserMaster',
      resolve(root: any) {
        return root.UserMaster
      },
    })
    t.nullable.field('CmStaffGeneral', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.CmStaffGeneral
      },
    })
    t.nullable.field('CompanyBranch', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.CompanyBranch
      },
    })
    t.nullable.field('CompanyService', {
      type: 'CompanyService',
      resolve(root: any) {
        return root.CompanyService
      },
    })
    t.list.field('PathwaysTaken', {
      type: 'PathwaysTaken',
      args: {
        where: 'PathwaysTakenWhereInput',
        orderBy: 'PathwaysTakenOrderByWithRelationInput',
        cursor: 'PathwaysTakenWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'PathwaysTakenScalarFieldEnum',
      },
      resolve(root: any) {
        return root.PathwaysTaken
      },
    })
    t.list.field('CommunicationsRequestedForms', {
      type: 'CommunicationsRequestedForms',
      args: {
        where: 'CommunicationsRequestedFormsWhereInput',
        orderBy: 'CommunicationsRequestedFormsOrderByWithRelationInput',
        cursor: 'CommunicationsRequestedFormsWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'CommunicationsRequestedFormsScalarFieldEnum',
      },
      resolve(root: any) {
        return root.CommunicationsRequestedForms
      },
    })
    t.nullable.field('_count', {
      type: 'BookingCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
