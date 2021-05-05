// import notificationBannerImage from '../../../assets/images/notification-image.png'
/*--- Template Modal Props ---*/

export const createTemplateStateArgs = {
  Email: {
    templateType: 'email',
    title: 'Create Email Template',
    visible: false,
    // icon?: React.Component
    // onClosed: () => alert(),
    // workingLabel?: string
    workingLabelVisible: false,
    buttonLabel: 'Create Email',
    // buttonClick?: () => void
  },
  SMS: {
    templateType: 'sms',
    title: 'Create SMS Template',
    visible: false,
    // icon?: React.Component
    onClosed: () => console.log(),
    // workingLabel?: string
    workingLabelVisible: false,
    buttonLabel: 'Create SMS',
    // buttonClick?: () => void
  },
  Letter: {
    templateType: 'letter',
    title: 'IPL Treatment Record (Clone)',
    visible: false,
    // icon?: React.Component
    onClosed: () => console.log(),
    // workingLabel?: string
    workingLabelVisible: false,
    buttonLabel: 'Create Letter',
    // buttonClick?: () => void
  },
}

export default createTemplateStateArgs

/*--- Template Modal Props End ---*/
