import { EventsDataProps } from './CommunicationTimeline'

export const eventsData: EventsDataProps[] = [
  {
    id: 1,
    type: 'sms',
    eventName: 'Scheduled SMS: Appointment 21 May with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please confirm your appointment with Dr. Kovalsky at Skin Health Clinic at 21 May at 14:00.',
    dateTime: '17-07-2022, 03:00 pm',
  },
  {
    id: 2,
    type: 'mail',
    eventName: 'Your Feedback',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '05-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    pinItems: [
      {
        item: 'https://www.antennahouse.com/hubfs/xsl-fo-sample/pdf/basic-link-1.pdf',
      },
      {
        item: 'http://www.africau.edu/images/default/sample.pdf',
      },
      {
        item: 'https://i.pinimg.com/originals/a3/f7/01/a3f70197315949b3f320764a8a194c32.jpg',
      },
    ],
    displayCollapse: true,
  },
  {
    id: 3,
    type: 'mail',
    eventName: 'Your Feedback',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '05-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 4,
    type: 'letter',
    eventName: 'Printed',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 12:00 pm',
    status: 'Awaiting Correction',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
  },
  {
    id: 5,
    type: 'mail',
    eventName: 'We Are Remaining Open for In-Clinic Appointments',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '02-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 6,
    type: 'mail',
    eventName: 'We Are Remaining Open for In-Clinic Appointments',
    description:
      'Dear Mr. Ballardin, You are attending London and I think it is a great opportunity to see your therapist and hear some feedback on your recent pains. Please let me know and I will schedule an appointment for you and Dr. Kovalsky. I hope you will get better an...',
    dateTime: '02-07-2021, 12:00 pm',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    displayCollapse: true,
  },
  {
    id: 9,
    type: 'call',
    eventName: 'Outbound call to Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 7,
    type: 'sms',
    eventName: 'Appointment 13 Mar with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please let me know if you want to cancel your appointment',
    status: 'Failed',
    dateTime: '01-07-2021, 03:00 pm',
  },
  {
    id: 8,
    type: 'sms',
    eventName: 'Appointment 13 Mar with Ben Ballardin',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    description:
      'Hi! Please let me know if you want to cancel your appointment',
    dateTime: '01-07-2021, 03:00 pm',
  },
  {
    id: 10,
    type: 'voice',
    eventName: 'GP Referral dictation',
    authorName: 'Vedran Taneski',
    dateTime: '10-04-2021, 12:00 pm',
    audioFile: 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3',
  },
  {
    id: 11,
    type: 'letter',
    eventName:
      'Your Medical Report from The London Skin and Hair Clinic (Test)',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 11:00 pm',
    status: 'Awaiting review',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
  },
  {
    id: 12,
    type: 'letter',
    eventName:
      'Your Medical Report from The London Skin and Hair Clinic (Test)',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    dateTime: '03-07-2021, 10:00 pm',
    status: 'Completed',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
    displayCollapse: true,
    sharedWith: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
  },
]
