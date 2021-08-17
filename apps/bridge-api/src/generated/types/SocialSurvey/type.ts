import { objectType } from 'nexus'

export const SocialSurvey = objectType({
  nonNullDefaults: {
    output: true,
    input: false,
  },
  name: 'SocialSurvey',
  definition(t) {
    t.int('id')
    t.int('page_id')
    t.int('company_id')
    t.int('twitter_id')
    t.int('disable_email')
    t.int('disable_sms')
    t.int('sms_message_id')
    t.string('from_name')
    t.nullable.int('sms_days_after')
    t.nullable.string('sms_send_time')
    t.string('feedback_title')
    t.string('feedback_subtitle')
    t.string('feedback_question')
    t.int('auto_facebook')
    t.int('auto_twitter')
    t.string('after_page')
    t.string('google_plus_link')
    t.int('google_review')
    t.string('google_review_url')
    t.string('aweber_code')
    t.int('score_indicator')
    t.int('add_note')
    t.int('post_buzzfeed')
    t.int('post_website')
    t.int('email_message_id')
    t.string('redirect_url')
    t.string('feedback_name')
    t.int('ty_enable_email')
    t.int('ty_enable_sms')
    t.int('ty_email_id')
    t.int('ty_sms_id')
    t.string('color_1')
    t.string('color_2')
    t.int('google_review_redirect')
    t.float('show_reviews_above')
    t.string('logo_position')
    t.nullable.int('logo_height')
    t.int('hits')
    t.field('Company', {
      type: 'Company',
      resolve(root: any) {
        return root.Company
      },
    })
  },
})
