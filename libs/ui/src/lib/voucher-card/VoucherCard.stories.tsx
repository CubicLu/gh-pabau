import React from 'react'
import VoucherCard, { VoucherCardProps } from './VoucherCard'

export default {
  title: 'UI/VoucherCard',
  component: VoucherCard,
  args: {
    cardWidth: 500,
    backgroundColor1: '#9013FE',
    backgroundColor2: '#BD10E0',
    gradientType: 'linear-gradient',
    borderColor: '#000',
    bookNowButton: false,
    buttonLabel: 'Book Now',
    dotMenuShow: false,
    voucherType: '',
    voucherNum: 100001,
    voucherPrice: 100,
    voucherPriceLabel: 'Voucher Value',
    voucherSoldPrice: 100,
    voucherSoldPriceLabel: 'Sold 5',
    voucherRelation: 'Family',
    voucherRelationLabel: 'Redeem on all services',
    currencyType: '£',
    termsConditions: `
      lorem ipsum, quia dolor sit, amet, consectetur, adipisci
      velit, sed quia non numquam eius modi tempora incidunt, ut
      labore et dolore magnam aliquam quaerat voluptatem.
    `,
  },
  argTypes: {
    cardWidth: {
      control: {
        type: 'number',
      },
    },
    backgroundColor1: {
      control: {
        type: 'color',
      },
    },
    backgroundColor2: {
      control: {
        type: 'color',
      },
    },
    borderColor: {
      control: {
        type: 'color',
      },
    },
    gradientType: {
      control: {
        type: 'select',
        options: ['linear-gradient', 'radial-gradient'],
      },
    },
    backgroundImg: {
      control: {
        type: 'text',
      },
    },
    bookNowButton: {
      control: {
        type: 'boolean',
      },
    },
    dotMenuShow: {
      control: {
        type: 'boolean',
      },
    },
    voucherType: {
      control: {
        type: 'select',
        options: ['valentine', 'birthday', 'flowers'],
      },
    },
  },
  parameters: {
    layout: 'fullscreen',
  },
}

const VoucherCardStory = ({ ...args }: VoucherCardProps) => (
  <div style={{ margin: '20px', maxWidth: '500px' }}>
    <VoucherCard {...args} />
  </div>
)
export const BasicVoucherCard = VoucherCardStory.bind({})
export const ValentineVoucherCard = VoucherCardStory.bind({})
export const BirthdayVoucherCard = VoucherCardStory.bind({})
export const FlowersVoucherCard = VoucherCardStory.bind({})
export const BookingVoucherCard = VoucherCardStory.bind({})
export const CustomVoucherCard = VoucherCardStory.bind({})

BasicVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: false,
  buttonLabel: 'Book Now',
  voucherType: '',
}

ValentineVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: false,
  buttonLabel: 'Book Now',
  voucherType: 'valentine',
}

BirthdayVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: false,
  buttonLabel: 'Book Now',
  voucherType: 'birthday',
}

FlowersVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: false,
  buttonLabel: 'Book Now',
  voucherType: 'flowers',
}

BookingVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: true,
  voucherType: '',
  buttonLabel: 'Book Now',
}

CustomVoucherCard.args = {
  backgroundColor1: '#9013FE',
  backgroundColor2: '#BD10E0',
  gradientType: 'linear-gradient',
  borderColor: '#000',
  bookNowButton: true,
  voucherType: 'Custom',
  buttonLabel: 'Book Now',
}
