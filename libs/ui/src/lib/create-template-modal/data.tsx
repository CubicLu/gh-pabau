// import React from 'react'
// import {
//   CreateTemplateBar,
//   CommunicationTemplatePreview,
//   CreateLetterTemplateBar,
//   CommunicationLetterPreview,
//   chooseModalSMSItems,
// } from '@pabau/ui'

// // import notificationBannerImage from '../../../assets/images/notification-image.png'
// /*--- Template Modal Props ---*/

// export const createTemplateStateArgs = {
//   Email: {
//     templateType: 'email',
//     title: 'Create Email Template',
//     visible: false,
//     // icon?: React.Component
//     // onClosed: () => alert(),
//     // workingLabel?: string
//     workingLabelVisible: false,
//     buttonLabel: 'Save',
//     // buttonClick?: () => void
//     // createTemplateBarProps?: CreateTemplateBarProps
//     sidebarComponent: (
//       <CreateTemplateBar
//         title={
//           'This notification automatically sends to clients ahead of their upcoming appointment.'
//         }
//         inputTextProps={{
//           labelName: 'Name',
//           placeholder: '',
//           onChange: (val: string) => console.log(val),
//         }}
//         linkProps={{
//           labelName: 'Learn More',
//           href: '/#',
//           onClick: () => console.log(),
//         }}
//         inputAreaProps={{
//           labelName: 'Message',
//           placeholder: 'e.g. Special Offer',
//           onChange: ({ target: { value } }) => console.log(),
//         }}
//         chooseTypeGroupProps={{
//           items: chooseModalSMSItems,
//           onSelected: () => {
//             console.log()
//           },
//         }}
//       />
//     ),
//     contentComponent: <CommunicationTemplatePreview />,
//   },
//   SMS: {
//     templateType: 'sms',
//     title: 'Create SMS Template',
//     visible: false,
//     // icon?: React.Component
//     // onClosed: () => console.log(),
//     // workingLabel?: string
//     workingLabelVisible: false,
//     buttonLabel: 'Save',
//     // buttonClick?: () => void
//     // createTemplateBarProps?: CreateTemplateBarProps
//     sidebarComponent: (
//       <CreateTemplateBar
//         title={
//           'This notification automatically sends to clients ahead of their upcoming appointment.'
//         }
//         inputTextProps={{
//           labelName: 'Name',
//           placeholder: '',
//           onChange: (val: string) => console.log(val),
//         }}
//         linkProps={{
//           labelName: 'Learn More',
//           href: '/#',
//           onClick: () => console.log(),
//         }}
//         inputAreaProps={{
//           labelName: 'Message',
//           placeholder: 'e.g. Special Offer',
//           onChange: ({ target: { value } }) => console.log(),
//         }}
//         chooseTypeGroupProps={{
//           items: chooseModalSMSItems,
//           onSelected: () => {
//             console.log()
//           },
//         }}
//       />
//     ),
//     contentComponent: <CommunicationTemplatePreview />,
//   },
//   Letter: {
//     templateType: 'letter',
//     title: 'IPL Treatment Record (Clone)',
//     visible: false,
//     // icon?: React.Component
//     // onClosed: () => console.log(),
//     // workingLabel?: string
//     workingLabelVisible: false,
//     buttonLabel: 'Save',
//     // buttonClick?: () => void
//     // createTemplateBarProps?: CreateTemplaeBarProps
//     sidebarComponent: <CreateLetterTemplateBar />,
//     contentComponent: (
//       <CommunicationLetterPreview
//         loaded={false}
//         // onChange={(file, tags) => {}}
//       />
//     ),
//   },
// }

// export default createTemplateStateArgs

// /*--- Template Modal Props End ---*/
