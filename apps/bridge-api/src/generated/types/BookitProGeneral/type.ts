import { objectType } from 'nexus'

export const BookitProGeneral = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'BookitProGeneral',
  definition(t) {
    t.int('id')
    t.int('company_id')
    t.string('advance_time')
    t.string('enable_payments')
    t.string('paypal_address')
    t.string('receive_email')
    t.string('create_invoice')
    t.float('deposit')
    t.string('show_prices')
    t.string('show_duration')
    t.boolean('show_description')
    t.string('header_color')
    t.string('booking_emails')
    t.string('online_color')
    t.string('warning_message')
    t.int('allow_cancel')
    t.int('disable_facebook')
    t.int('interval')
    t.int('disable_extra_information')
    t.int('coupon_active')
    t.string('payment_api_url')
    t.float('account_deposit')
    t.int('replace_job_titles')
    t.int('hide_facebook_share')
    t.int('enable_bookings')
    t.string('default_payment')
    t.int('registration_optional')
    t.nullable.boolean('consultations_only')
    t.boolean('only_existing')
    t.int('stripe_reciever')
    t.string('stripe_public_key')
    t.string('stripe_private_key')
    t.string('offline_message')
    t.int('disable_locations')
    t.string('theme')
    t.boolean('promo_codes')
    t.string('terms_conditions')
    t.string('ga_analytics')
    t.nullable.string('gt_manager')
    t.string('fb_code')
    t.string('fb_event')
    t.int('doc_shared_template')
    t.int('classes_email_confirm')
    t.string('sage_vendor')
    t.string('sage_username')
    t.string('sage_password')
    t.string('gc_public_key')
    t.string('gc_private_key')
    t.nullable.int('enable_title')
    t.boolean('group_by_region')
    t.boolean('use_new_connect')
    t.int('disable_reviews')
    t.boolean('allow_rating')
    t.boolean('show_cat_photos')
    t.string('class_columns')
    t.boolean('no_vat_prices')
    t.nullable.field('integration_method', {
      type: 'bookitpro_general_integration_method',
    })
    t.int('rolling_deposit')
    t.boolean('one_touch_book')
    t.int('new_stripe')
    t.boolean('enable_master_cat')
    t.float('stripe_fee')
    t.string('reccuring_search_btn')
    t.boolean('force_new_existing_patient')
    t.string('redirect_url')
    t.nullable.string('connect_url')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
