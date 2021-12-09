import { objectType } from 'nexus'

export const CompanyDetails = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'CompanyDetails',
  definition(t) {
    t.int('details_id')
    t.int('company_id')
    t.string('company_name')
    t.string('subscription')
    t.string('industry_sector')
    t.string('employees')
    t.string('website')
    t.string('street')
    t.string('city')
    t.string('county')
    t.string('post_code')
    t.string('country')
    t.string('phone')
    t.string('fax')
    t.string('info_email')
    t.int('admin')
    t.string('logo')
    t.string('currency')
    t.string('facebook_page')
    t.string('twitter_page')
    t.int('head_office')
    t.string('footer_logo')
    t.string('header_logo')
    t.string('vat')
    t.string('date_format')
    t.string('week_start_day')
    t.int('auto_sms')
    t.int('sms_active')
    t.int('db_lock')
    t.string('stock_manager')
    t.string('company_notes')
    t.int('timezone_id')
    t.float('converted_value')
    t.int('enable_2fa')
    t.int('enable_ad')
    t.nullable.string('enable_ad_code')
    t.nullable.int('enable_ip_filter')
    t.int('demo_mode')
    t.string('linkedin_page')
    t.string('youtube_page')
    t.int('is_surgical')
    t.int('private_treatment_notes')
    t.int('accept_insurance')
    t.int('phone_prefix')
    t.field('tax_name', { type: 'company_details_tax_name' })
    t.int('secure_medical_forms')
    t.int('debrand_logo')
    t.string('default_search')
    t.string('calendar_version')
    t.string('contact_term_singular')
    t.string('contact_term_plural')
    t.int('flag_enabled')
    t.int('lock_prescription')
    t.boolean('show_report_logo')
    t.string('rota_version')
    t.boolean('use_google_auth')
    t.boolean('employee_clock_track')
    t.nullable.string('slug')
    t.int('default_inv_template_id')
    t.string('diagnosis_codes_type')
    t.int('append_client_pref')
    t.boolean('capital_surname')
    t.int('disable_prescriptions')
    t.int('cycles_display')
    t.int('enable_sens_data')
    t.string('class_term_singular')
    t.string('class_term_plural')
    t.int('sensitive_data_question')
    t.boolean('legacy_consultations')
    t.string('class_teacher_singular')
    t.string('employee_term_singular')
    t.string('employee_term_plural')
    t.int('medical_approvals')
    t.int('new_reports')
    t.boolean('merge_bookings_tabs')
    t.int('preferences_sms')
    t.int('preferences_email')
    t.int('preferences_post')
    t.int('preferences_newsletters')
    t.nullable.boolean('healthcode_live')
    t.int('lock_export')
    t.string('language')
    t.boolean('completed_setup')
    t.field('timezone', {
      type: 'Timezone',
      resolve(root: any) {
        return root.timezone
      },
    })
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
    t.list.field('User', {
      type: 'User',
      args: {
        where: 'UserWhereInput',
        orderBy: 'UserOrderByWithRelationInput',
        cursor: 'UserWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'UserScalarFieldEnum',
      },
      resolve(root: any) {
        return root.User
      },
    })
    t.list.field('InvoiceTemplate', {
      type: 'InvoiceTemplate',
      args: {
        where: 'InvoiceTemplateWhereInput',
        orderBy: 'InvoiceTemplateOrderByWithRelationInput',
        cursor: 'InvoiceTemplateWhereUniqueInput',
        take: 'Int',
        skip: 'Int',
        distinct: 'InvoiceTemplateScalarFieldEnum',
      },
      resolve(root: any) {
        return root.InvoiceTemplate
      },
    })
    t.field('InvoiceDefaultTemplate', {
      type: 'InvoiceTemplate',
      resolve(root: any) {
        return root.InvoiceDefaultTemplate
      },
    })
    t.nullable.field('_count', {
      type: 'CompanyDetailsCountOutputType',
      resolve(root: any) {
        return root._count
      },
    })
  },
})
