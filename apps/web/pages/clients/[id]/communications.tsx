import { useState, useEffect } from 'react'
import { ClientCardLayout } from '../../../components/Clients/ClientCardLayout'
import { useRouter } from 'next/router'
import {
  EventsDataProps,
  ClientCommunicationsLayout,
  PaginationType,
  PinItemProps,
} from '@pabau/ui'
import dayjs from 'dayjs'
import { GetFormat } from '../../../../web/hooks/displayDate'
import {
  useGetClientCommunicationLazyQuery,
  useCountClientCommunicationLazyQuery,
} from '@pabau/graphql'
import { checkIsUrl, isHTML } from '../../../helper/checkContentType'

const CommunicationTab = () => {
  const router = useRouter()
  const contactID = Number(router.query['id'])
  const dateFormat = GetFormat()
  const [communicationData, setCommunicationData] = useState<
    EventsDataProps[]
  >()
  const [pagination, setPagination] = useState<PaginationType>({
    total: 0,
    offSet: 0,
    limit: 50,
    currentPage: 1,
  })
  const [
    getClientCommunication,
    { data: communicateData, loading: communicationLoading },
  ] = useGetClientCommunicationLazyQuery()
  const [
    getCommunityCount,
    { data: countCommunition, loading: countLoading },
  ] = useCountClientCommunicationLazyQuery()

  useEffect(() => {
    getClientCommunication({
      variables: {
        contactID: contactID,
        skip: pagination.offSet,
        take: pagination.limit,
      },
    })
    getCommunityCount({
      variables: {
        contactID: contactID,
      },
    })
  }, [
    pagination.offSet,
    pagination.limit,
    getCommunityCount,
    contactID,
    getClientCommunication,
  ])
  useEffect(() => {
    if (countCommunition?.aggregateCommunication) {
      setPagination({
        ...pagination,
        total: countCommunition.aggregateCommunication?.count?.id,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countCommunition?.aggregateCommunication])
  useEffect(() => {
    let obj: EventsDataProps
    if (communicateData?.communication) {
      let attachment: PinItemProps[] = []

      const communications = communicateData?.communication.map((d) => {
        obj = {
          id: d?.id,
          type: d?.type.toLocaleLowerCase(),
          dateTime: dayjs(d?.date).format('MM-DD-YYYY hh:mm'),
        }

        if (d?.recipient.length > 0) {
          if (d?.type.toLocaleLowerCase() === 'email') {
            obj.numberOfOpened = d?.recipient[0]?.read_count.toString()
          }
          obj.isReceived = true
          if (d.recipient[0].Contact) {
            obj.status = d?.recipient[0].status
            obj['moved'] = {
              from: { name: d?.recipient[0].Contact.Fname },
              to: { name: d?.Users?.full_name ?? '' },
            }
          }
        } else {
          obj.isReceived = false
          obj['moved'] = {
            from: { name: d?.from ?? '' },
            to: { name: d?.Users?.full_name ?? '' },
          }
        }
        obj.eventName = d?.content?.subject
        if (d?.message) {
          switch (true) {
            case isHTML(d.message):
              obj.description = d.message
              break
            case checkIsUrl(d.message):
              obj.letterUrl = d.message
              break
            default:
              obj.description = d?.message
              break
          }
          obj.displayCollapse = true
        }

        if (d?.attachment) {
          for (const val of d?.attachment) {
            if (val?.file_url) {
              attachment.push({ item: val.file_url })
            }
          }
          obj.pinItems = attachment
          attachment = []
        }
        return obj
      })
      setCommunicationData(communications)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [communicateData?.communication])
  return (
    <div>
      <ClientCardLayout
        cssClass={'cardCoustomWrapper'}
        clientId={contactID}
        activeTab="communications"
      >
        <ClientCommunicationsLayout
          isLoading={communicationLoading || countLoading}
          eventsData={communicationData}
          eventDateFormat={dateFormat}
          pagination={pagination}
          setPagination={setPagination}
        />
      </ClientCardLayout>
    </div>
  )
}
export default CommunicationTab
