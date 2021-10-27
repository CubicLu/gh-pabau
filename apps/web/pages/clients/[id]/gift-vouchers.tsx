import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useGetSoldVouchersQuery } from '@pabau/graphql'
import { ClientGiftVoucherLayout } from '@pabau/ui'

const Appointments = () => {
  const router = useRouter()

  const { data } = useGetSoldVouchersQuery({
    variables: {
      contactID: Number(router.query['id']),
    },
  })

  console.log('data', data)

  const activeVouchers: any = data?.vouchers?.map(
    (val) =>
      val.status === 'Active' && {
        id: val.id,
        validTill: val?.expiry_date,
        voucher: {
          backgroundColor1: '#9013FE',
          backgroundColor2: '#BD10E0',
          gradientType: 'radial-gradient',
          buttonLabel: 'button',
          borderColor: '#000',
          voucherPrice: val.amount,
          voucherPriceLabel: val.description,
          voucherRelation: '',
          voucherRelationLabel: val.description,
        },
      }
  )

  const expiredVouchers: any = data?.vouchers?.map(
    (val) =>
      val.status !== 'Active' && {
        id: val.id,
        validTill: val?.expiry_date,
        voucher: {
          backgroundColor1: '#9013FE',
          backgroundColor2: '#BD10E0',
          gradientType: 'radial-gradient',
          buttonLabel: 'button',
          borderColor: '#000',
          voucherPrice: val.amount,
          voucherPriceLabel: val.description,
          voucherRelation: '',
          voucherRelationLabel: val.description,
        },
      }
  )

  console.log('voucherData', data)

  return (
    <div>
      <ClientCardLayout
        clientId={Number(router.query['id'])}
        activeTab="gift-vouchers"
      >
        <ClientGiftVoucherLayout
          isEmpty={false}
          activeVouchers={activeVouchers || []}
          expiredVouchers={expiredVouchers || []}
          onCardSelect={undefined}
        />
      </ClientCardLayout>
    </div>
  )
}

export default Appointments
