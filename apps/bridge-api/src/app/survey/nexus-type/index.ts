import { objectType } from 'nexus'

export const PublicSocialSurveyFeedbackResponse = objectType({
  name: 'Public_SocialSurveyFeedback',
  definition(t) {
    t.id('id')
    t.int('rating')
    t.int('date')
    t.string('feedback_comment')
    t.string('feedback_name')
    t.string('feedback_status')
  },
})
