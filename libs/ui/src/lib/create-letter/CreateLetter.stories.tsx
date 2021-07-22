import React from 'react'
import CreateLetter, { CreateLetterProps } from './CreateLetter'

export default {
  component: CreateLetter,
  title: 'Client Card/CreateLetter',
  args: {},
  argTypes: {},
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const CreateLetterStory = ({ ...args }: CreateLetterProps) => {
  return (
    <div
      style={{
        width: 'calc(100vw - 32px)',
        height: '824px',
        border: '1px solid var(--border-color-base)',
      }}
    >
      <CreateLetter {...args} />
    </div>
  )
}

export const Basic = CreateLetterStory.bind({})
Basic.args = {
  draft: {
    subject: '',
    template: '',
    toList: [],
    ccList: [],
    bccList: [],
    appointment: '',
    inovice: '',
    content: '',
    clientSalution: '',
    appointmentLastName: '',
  },
  templateList: ['Template 1', 'Template 2'],
  recipientList: [
    {
      relationship: 'emergency-contact',
      firstName: 'Bruno',
      lastName: 'Ballardin',
      email: 'bruno.ballardin@example.com',
      avatar:
        'https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1621814400&Signature=ORCJatob~sM6YX5oPvCVgOI0kqU2-7ZDyA31WhVm~ZPm31vqblCOPmCaLObYbMDhtvHDluAoz4ToaOZ8FFbeX6n-YzyDBtEM91k1v6pygr0h2EmfwcCAxxUyeM30KsZedKWlpblp0sscg2l1xnYp~~mbSsmDtw58fxL2Y1wiEu9BGdnc5KeM6fZZN4Y1T93ELbAMNGy99iOF29rFN9wR3C3HaASuI6AjKPgVT8yJ0LunNc6jKm69KdekBbi8pYEa6kgDHMfODIxNWHAU7qvAIhT6aSFkjTptYi2r~yKJL3PP9gL0u-QLVe-N9vuMnk8zo9UoAQ8TQII1tnISJGhuGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      relationship: 'family-member',
      firstName: 'Jessica',
      lastName: 'Winter',
      email: 'jessica.winter@example.com',
      avatar:
        'https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1621814400&Signature=ORCJatob~sM6YX5oPvCVgOI0kqU2-7ZDyA31WhVm~ZPm31vqblCOPmCaLObYbMDhtvHDluAoz4ToaOZ8FFbeX6n-YzyDBtEM91k1v6pygr0h2EmfwcCAxxUyeM30KsZedKWlpblp0sscg2l1xnYp~~mbSsmDtw58fxL2Y1wiEu9BGdnc5KeM6fZZN4Y1T93ELbAMNGy99iOF29rFN9wR3C3HaASuI6AjKPgVT8yJ0LunNc6jKm69KdekBbi8pYEa6kgDHMfODIxNWHAU7qvAIhT6aSFkjTptYi2r~yKJL3PP9gL0u-QLVe-N9vuMnk8zo9UoAQ8TQII1tnISJGhuGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      relationship: 'family-member',
      firstName: 'Jeff',
      lastName: 'Koons',
      email: 'jeff.koons@example.com',
      avatar:
        'https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1621814400&Signature=ORCJatob~sM6YX5oPvCVgOI0kqU2-7ZDyA31WhVm~ZPm31vqblCOPmCaLObYbMDhtvHDluAoz4ToaOZ8FFbeX6n-YzyDBtEM91k1v6pygr0h2EmfwcCAxxUyeM30KsZedKWlpblp0sscg2l1xnYp~~mbSsmDtw58fxL2Y1wiEu9BGdnc5KeM6fZZN4Y1T93ELbAMNGy99iOF29rFN9wR3C3HaASuI6AjKPgVT8yJ0LunNc6jKm69KdekBbi8pYEa6kgDHMfODIxNWHAU7qvAIhT6aSFkjTptYi2r~yKJL3PP9gL0u-QLVe-N9vuMnk8zo9UoAQ8TQII1tnISJGhuGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      relationship: 'practioner',
      firstName: 'Smith',
      lastName: 'Practice',
      email: 'smith.practice@example.com',
      avatar:
        'https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1621814400&Signature=ORCJatob~sM6YX5oPvCVgOI0kqU2-7ZDyA31WhVm~ZPm31vqblCOPmCaLObYbMDhtvHDluAoz4ToaOZ8FFbeX6n-YzyDBtEM91k1v6pygr0h2EmfwcCAxxUyeM30KsZedKWlpblp0sscg2l1xnYp~~mbSsmDtw58fxL2Y1wiEu9BGdnc5KeM6fZZN4Y1T93ELbAMNGy99iOF29rFN9wR3C3HaASuI6AjKPgVT8yJ0LunNc6jKm69KdekBbi8pYEa6kgDHMfODIxNWHAU7qvAIhT6aSFkjTptYi2r~yKJL3PP9gL0u-QLVe-N9vuMnk8zo9UoAQ8TQII1tnISJGhuGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
    {
      relationship: 'insurance-provider',
      company: 'BUPA',
      email: 'bupa@example.com',
      avatar:
        'https://s3-alpha-sig.figma.com/img/17e2/36e7/792198289a82e561e94182d98c766598?Expires=1621814400&Signature=ORCJatob~sM6YX5oPvCVgOI0kqU2-7ZDyA31WhVm~ZPm31vqblCOPmCaLObYbMDhtvHDluAoz4ToaOZ8FFbeX6n-YzyDBtEM91k1v6pygr0h2EmfwcCAxxUyeM30KsZedKWlpblp0sscg2l1xnYp~~mbSsmDtw58fxL2Y1wiEu9BGdnc5KeM6fZZN4Y1T93ELbAMNGy99iOF29rFN9wR3C3HaASuI6AjKPgVT8yJ0LunNc6jKm69KdekBbi8pYEa6kgDHMfODIxNWHAU7qvAIhT6aSFkjTptYi2r~yKJL3PP9gL0u-QLVe-N9vuMnk8zo9UoAQ8TQII1tnISJGhuGw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
    },
  ],
  appointmentList: ['Appointment 1', 'Appointment 2'],
  invoiceList: ['Invoice 1', 'Invoice 2'],
  onSend: (letter) => {
    console.log('Send letter >>>', letter)
  },
  onSave: (letter) => {
    console.log('Save letter >>>', letter)
  },
  onSaveDraft: (letter) => {
    console.log('Save Draft >>>', letter)
  },
  onDiscardDraft: () => {
    console.log('Discard Draft >>>')
  },
}
