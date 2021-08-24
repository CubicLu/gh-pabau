const reviewScheduleValue = {
  reviewDate: new Date(new Date().setMonth(new Date().getMonth() + 1)),
}

const peerQuestionList = {
  peerSelfAssessmentQuestion: [
    {
      id: 1,
      value:
        '(Name) takes careful consideration before attempting tasks, before executing them with perfection.',
    },
    {
      id: 2,
      value:
        '(Name) takes time to help the team, often taken time away from performing their own tasks.',
    },
    {
      id: 3,
      value:
        '(Name) turns up to work with enthuism and energy to plough through.',
    },
    {
      id: 4,
      value: '(Name) is dedicated to his job.',
    },
  ],
  questionEmployee: [
    {
      id: 1,
      value: 'Good Thinker',
    },
    {
      id: 2,
      value: 'Team Player',
    },
    {
      id: 3,
      value: 'Motivated',
    },
    {
      id: 4,
      value: 'Dedication',
    },
  ],
}

const AssessmentList = {
  selfAssessmentQuestion: [
    {
      id: 1,
      value: 'How well daes (Company) recognize my value?',
    },
    {
      id: 2,
      value: 'What would have the greatest impact on my ability to do...',
    },
    {
      id: 3,
      value: 'What are some things I do well?',
    },
    {
      id: 4,
      value: 'How could I improve?',
    },
  ],
  questionManager: [
    {
      id: 1,
      value: 'If (Name) got a job offer elsewhere, I would...',
    },
    {
      id: 2,
      value: 'How engaged is (Name) at work?',
    },
    {
      id: 3,
      value: 'What are some things (Name) does well?',
    },
    {
      id: 4,
      value: 'How could (Name) improve?',
    },
  ],
  peerAssessmentList: peerQuestionList,
}

const peopleList = [
  { name: 'Jessica Winter', selected: false },
  { name: 'Jeff Hackley', selected: false },
  { name: 'Alexander Wang', selected: false },
  { name: 'Linda Davis', selected: false },
  { name: 'William Tyson', selected: false },
  { name: 'Max Starck', selected: false },
  { name: 'Kyle Walsh', selected: false },
  { name: 'Owen Phillips', selected: false },
  { name: 'Aidan Kelly', selected: false },
  { name: 'Ewan Morgan', selected: false },
  { name: 'Jordan Martin', selected: false },
  { name: 'Grant Dudley', selected: false },
]

export const PerformanceConfigObj = {
  review: {
    date: reviewScheduleValue.reviewDate,
  },
  assessment: AssessmentList,
  peopleList: { peopleList },
}
