import React from 'react'
import { useRouter } from 'next/router'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useGetSoldVouchersQuery } from '@pabau/graphql'
import { ClientGiftVoucherLayout } from '@pabau/ui'
import dayjs from 'dayjs'
import { useUser } from '../../../context/UserContext'
import stringToCurrencySignConverter from '../../../helper/stringToCurrencySignConverter'

const Appointments = () => {
  const router = useRouter()
  const user = useUser()
  const { data } = useGetSoldVouchersQuery({
    variables: {
      contactID: Number(router.query['id']),
    },
  })

  const voucherData = (data) => {
    return data?.map((val) => {
      return {
        id: val.id,
        validTill: val?.expiry_date,
        voucher: {
          backgroundColor1: '#9013FE',
          backgroundColor2: '#BD10E0',
          gradientType: 'linear-gradient',
          borderColor: '#000',
          voucherPrice: val?.amount,
          voucherNum: val?.code,
          voucherSoldPrice: val?.remaining_balance,
          currencyType: stringToCurrencySignConverter(user.me?.currency),
          voucherPriceLabel: 'Voucher Value',
          voucherSoldPriceLabel: `Expires on: ${dayjs(val?.expiry_date).format(
            'DD MMM'
          )}`,
          voucherRelation: val?.description,
          termsConditions:
            'This voucher is non-refundable and cannot be exchanged for cash in part or full. It is valid until the date mentioned on the voucher',
          // voucherRelationLabel: val?.description,
        },
      }
    })
  }

  const activeVouchers: any = data?.vouchers?.filter(
    (val) => val.status === 'Active' && val
  )
  const expiredVouchers: any = data?.vouchers?.filter(
    (val) => val.status !== 'Active' && val
  )

  return (
    <div>
      <ClientCardLayout
        clientId={Number(router.query['id'])}
        activeTab="gift-vouchers"
      >
        <ClientGiftVoucherLayout
          isEmpty={
            activeVouchers?.length || expiredVouchers?.length ? false : true
          }
          activeVouchers={voucherData(activeVouchers) || []}
          expiredVouchers={voucherData(expiredVouchers) || []}
          onCardSelect={(e) => Promise.resolve(true)}
        />
      </ClientCardLayout>
    </div>
  )
}

export default Appointments
