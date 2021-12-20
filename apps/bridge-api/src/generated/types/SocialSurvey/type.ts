import { objectType } from 'nexus'

export const SocialSurvey = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurvey',
  definition(t) {
    t.int('id')
    t.nullable.int('page_id')
    t.int('company_id')
    t.nullable.int('twitter_id')
    t.int('disable_email')
    t.int('disable_sms')
    t.int('sms_message_id')
    t.nullable.string('from_name')
    t.nullable.int('sms_days_after')
    t.nullable.string('sms_send_time')
    t.string('feedback_title')
    t.string('feedback_subtitle')
    t.string('feedback_question')
    t.int('auto_facebook')
    t.int('auto_twitter')
    t.nullable.string('after_page')
    t.nullable.string('google_plus_link')
    t.int('google_review')
    t.string('google_review_url')
    t.nullable.string('aweber_code')
    t.nullable.int('score_indicator')
    t.int('add_note')
    t.int('post_buzzfeed')
    t.int('post_website')
    t.nullable.int('email_message_id')
    t.nullable.string('redirect_url')
    t.string('feedback_name')
    t.nullable.int('ty_enable_email')
    t.nullable.int('ty_enable_sms')
    t.nullable.int('ty_email_id')
    t.int('ty_sms_id')
    t.string('color_1')
    t.string('color_2')
    t.int('google_review_redirect')
    t.float('show_reviews_above')
    t.nullable.string('logo_position')
    t.nullable.int('logo_height')
    t.nullable.int('hits')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
