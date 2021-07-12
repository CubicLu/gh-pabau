import { EventsProps } from '@pabau/ui'
import photo1 from '../../assets/images/timeline/photo1.png'
import photo2 from '../../assets/images/timeline/photo2.png'
import photo3 from '../../assets/images/timeline/photo3.png'
import photo4 from '../../assets/images/timeline/photo4.png'
import photo5 from '../../assets/images/timeline/photo5.png'
import photo6 from '../../assets/images/timeline/photo6.png'

export const eventsData: EventsProps[] = [
  {
    id: 1,
    type: 'appointment',
    eventName: 'Follow up consultation (20310)',
    clientName: 'Martin Wade',
    paymentMethod: 'Client wants to pay by card',
    dateTime: '21-08-2021, 3:15 pm',
  },
  {
    id: 2,
    type: 'taskLostEmail',
    eventName: 'Send brochure Lost Email',
    clientName: 'Kane',
    dateTime: '18-06-2021, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 3,
    type: 'taskSMS',
    eventName: 'Send SMS',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 4,
    type: 'taskCall',
    eventName: 'Call to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 5,
    type: 'taskEmail',
    eventName: 'Email to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 6,
    type: 'taskLetter',
    eventName: 'Send letter to Bruno Ballardin',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: false,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 7,
    type: 'taskLostEmail',
    eventName: 'Send brochure Lost Email',
    clientName: 'Kane',
    dateTime: '14-05-2021, 3:15 pm',
    taskChecked: true,
    taskUserName: 'Jeremy Epstein',
  },
  {
    id: 8,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 3:15 pm',
    status: 'Arrived',
  },
  {
    id: 9,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    dateTime: '13-05-2021, 3:15 pm',
    status: 'Cancelled',
    moved: { from: { name: 'Vedran Taneski' }, to: { name: 'Ben Gough' } },
  },
  {
    id: 41,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    dateTime: '13-05-2021, 3:15 pm',
    status: 'Moved',
  },
  {
    id: 10,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'Confirmed',
  },
  {
    id: 11,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'Rescheduled',
  },
  {
    id: 12,
    type: 'appointment',
    eventName: 'Follow up consultation (20309)',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'No Show',
  },
  {
    id: 13,
    type: 'appointment',
    eventName: 'Follow up consultation',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'Created',
  },
  {
    id: 14,
    type: 'payment',
    eventName: 'Payment #38128',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'Sent',
    payment: '£41.00',
  },
  {
    id: 15,
    type: 'refund',
    eventName: 'Refund #38128',
    clientName: 'Martin Wade',
    dateTime: '13-05-2021, 12:00 pm',
    status: 'Sent',
    payment: '-£41.00',
  },
  {
    id: 16,
    type: 'clientNote',
    eventName: 'Client note',
    clientName: 'Martin Wade',
    description:
      'Dear John, thank you for booking your appointment at our clinic',
    appointmentWith: 'Your appointment with Dr Smith',
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 17,
    type: 'staffAlert',
    eventName: 'Staff Alert',
    clientName: 'Martin Wade',
    description:
      'Dear John, thank you for booking your appointment at our clinic',
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 18,
    type: 'photos',
    eventName: 'Photos',
    clientName: 'Doctor LSAH',
    photos: [photo1],
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 19,
    type: 'photos',
    eventName: 'Photos',
    clientName: 'Doctor LSAH',
    photos: [photo1, photo2, photo3],
    sharedWith: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 20,
    type: 'photos',
    eventName: 'Photos',
    clientName: 'Doctor LSAH',
    photos: [photo4, photo5, photo6, photo6, photo6, photo4, photo5, photo6],
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 21,
    type: 'document',
    eventName: 'Document',
    documentFile: 'http://www.pdf995.com/samples/pdf.pdf',
    clientName: 'Martin Wade',
    sharedWith: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 22,
    type: 'mail',
    eventName: 'Re: Your consultation',
    description:
      'Dear John, I have gone ahead and looked to book an appointment in with Dr Smith Brandham for next Thursday if that time works ok with you?\n\n' +
      'Please let me know as soon as possible.See you soon, \n' +
      'Dr Wade',
    dateTime: '10-04-2021, 12:00 pm',
    openedBy: [
      { firstName: 'Alexis', lastName: 'Moor' },
      { firstName: 'William', lastName: 'Brandham' },
    ],
    clientName: 'Martin Wade',
    displayCollapse: true,
  },
  {
    id: 23,
    type: 'sms',
    eventName: 'SMS Sent to John',
    description: 'Do you have any time next week by any chance?',
    clientName: 'Martin Wade',
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 24,
    type: 'letter',
    eventName: 'GP Letter',
    description:
      'Dear Smith, I saw this lovely 40 year old gentleman for a removal of a mole',
    clientName: 'Martin Wade',
    dateTime: '10-04-2021, 12:00 pm',
    displayCollapse: true,
  },
  {
    id: 25,
    type: 'call',
    eventName: 'Call',
    clientName: 'Martin Wade',
    dateTime: '10-04-2021, 12:00 pm',
  },
  {
    id: 26,
    type: 'medicalForm',
    eventName: 'Botox Treatment Form',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
  },
  {
    id: 27,
    type: 'medicalForm',
    eventName: 'COVID19 Consent',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
  },
  {
    id: 28,
    type: 'medicalCondition',
    eventName: 'Peanut allergy',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
  },
  {
    id: 29,
    type: 'medicalCondition',
    eventName: 'Minoxodil 2mg',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
  },
  {
    id: 30,
    type: 'medicalForm',
    eventName: 'Medical history',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
  },
  {
    id: 31,
    type: 'lab',
    eventName: 'TDL Labs',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
    status: 'Sent',
  },
  {
    id: 32,
    type: 'lab',
    eventName: 'Lab order',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
    status: 'Requested',
  },
  {
    id: 33,
    type: 'lab',
    eventName: 'Lab order',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
    status: 'Received',
  },
  {
    id: 34,
    type: 'recall',
    eventName: 'Botox recall 90 days',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
    status: 'Scheduled',
  },
  {
    id: 35,
    type: 'recall',
    eventName: 'Botox recall 90 days',
    clientName: 'Martin Wade',
    dateTime: '06-04-2021, 12:00 pm',
    status: 'Sent',
  },
  {
    id: 36,
    type: 'pabauConnect',
    eventName: 'Registered to Pabau Connect',
    clientName: 'Martin Wade',
    dateTime: '12-03-2021, 12:00 pm',
  },
  {
    id: 37,
    type: 'invoice',
    eventName: 'Invoice #38128',
    clientName: 'Martin Wade',
    dateTime: '12-03-2021, 03:00 pm',
    payment: '£41.00',
    status: 'Sent',
  },
  {
    id: 38,
    type: 'credit',
    eventName: 'Credit #38128',
    clientName: 'Martin Wade',
    dateTime: '12-03-2021, 1:00 pm',
    payment: '£41.00',
  },
]