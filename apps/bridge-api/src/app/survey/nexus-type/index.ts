import { objectType } from 'nexus'

export const PublicSocialSurveyFeedbackResponse = objectType({
  name: 'Public_SocialSurveyFeedback',
  definition(t) {
    t.int('id')
    t.int('rating')
    t.float('date')
    t.string('feedback_comment')
    t.string('feedback_name')
    t.string('feedback_status')
    t.string('service')
    t.string('owner_response')
  },
})
