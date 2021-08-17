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
    t.nullable.int('start_date')
    t.nullable.int('end_date')
    t.nullable.int('start_time')
    t.nullable.int('end_time')
    t.nullable.string('service')
    t.nullable.int('contact_id')
    t.int('UID')
    t.int('occupier')
    t.nullable.string('backgroudcolor')
    t.nullable.int('create_date')
    t.nullable.int('update_date')
    t.string('status')
    t.float('estimated_cost')
    t.float('tips')
    t.float('discounts')
    t.string('where')
    t.nullable.int('room_id')
    t.string('unique_id')
    t.nullable.string('reason')
    t.nullable.int('invoice_id')
    t.int('booking_id')
    t.nullable.int('Online')
    t.int('package_id')
    t.int('cancel_take')
    t.int('book_take')
    t.int('class_master_id')
    t.int('unavailable')
    t.string('coupon_claim_id')
    t.int('related_id')
    t.int('service_id')
    t.int('rebook')
    t.int('repeat_id')
    t.int('requested')
    t.int('sent_sms')
    t.int('sent_email')
    t.int('sent_survey')
    t.int('custom_contact_id')
    t.nullable.string('custom_contact_name')
    t.string('custom_user_id')
    t.nullable.string('custom_user_name')
    t.string('custom_service_id')
    t.int('imported')
    t.int('client_confirmed')
    t.string('hold_guid')
    t.int('created_by_uid')
    t.int('marketing_source')
    t.int('resource_id')
    t.nullable.string('custom_room_name')
    t.string('custom_created_by_user_name')
    t.int('location_id')
    t.int('modified_by_uid')
    t.boolean('sent_email_reminder')
    t.int('disable_locations')
    t.int('participant_master_uid')
    t.int('participant_master_booking_id')
    t.string('participant_slave_uids')
    t.string('participant_slave_booking_ids')
    t.int('private')
    t.string('external_guest_ids')
    t.string('description')
    t.int('issued_to')
    t.int('contract_id')
    t.int('all_day')
    t.int('interlinked_master_uid')
    t.int('all_day_start_date')
    t.int('all_day_end_date')
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
    t.nullable.field('connect_client', {
      type: 'UserMaster',
      resolve(root: any) {
        return root.connect_client
      },
    })
    t.nullable.field('practitioner', {
      type: 'CmStaffGeneral',
      resolve(root: any) {
        return root.practitioner
      },
    })
    t.nullable.field('booking_location', {
      type: 'CompanyBranch',
      resolve(root: any) {
        return root.booking_location
      },
    })
  },
})
