interface FeaturePerformance {
  id: number
  value?: string
}

interface PeopleList {
  name: string
  selected: boolean
}

interface PeerAssessmentList {
  peerSelfAssessmentQuestion: Array<FeaturePerformance>
  questionEmployee: Array<FeaturePerformance>
}
interface AssessmentList {
  selfAssessmentQuestion: Array<FeaturePerformance>
  questionManager: Array<FeaturePerformance>
  peerAssessmentList: PeerAssessmentList
}

interface ReviewScheduleConfig {
  date: Date
}

interface AssessmentScheduleConfig {
  assessment: AssessmentList
}

interface PeopleConfig {
  peopleList: Array<PeopleList>
}
