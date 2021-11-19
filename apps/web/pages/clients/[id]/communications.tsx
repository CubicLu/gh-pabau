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
import {
  useGetClientCommunicationLazyQuery,
  useCountClientCommunicationLazyQuery,
} from '@pabau/graphql'
import { getImage } from '../../../components/Uploaders/UploadHelpers/UploadHelpers'

const CommunicationTab = () => {
  const router = useRouter()
  const contactID = Number(router.query['id'])
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
  ] = useGetClientCommunicationLazyQuery({
    fetchPolicy: 'no-cache',
  })
  const [
    getCommunityCount,
    { data: countCommunition, loading: countLoading },
  ] = useCountClientCommunicationLazyQuery()
  // function isHTML(str) {
  //   const doc = new DOMParser().parseFromString(str, 'text/html')
  //   return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1)
  // }
  useEffect(() => {
    getClientCommunication({
      variables: {
        contactID: contactID,
        offSet: pagination.offSet,
        limit: pagination.limit,
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
    if (countCommunition?.findManyCommunication) {
      setPagination({
        ...pagination,
        total: countCommunition.findManyCommunication.length,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countCommunition?.findManyCommunication])
  useEffect(() => {
    const Communications: EventsDataProps[] = []
    //const receivercommunication: EventsDataProps[] = []
    let obj: EventsDataProps
    if (communicateData?.communication) {
      let attachment: PinItemProps[] = []
      for (const d of communicateData?.communication) {
        obj = {
          id: d?.id,
          type: d?.type.toLocaleLowerCase(),
          dateTime: dayjs(d?.date).format('DD-MM-YYYY, h:mm a'),
        }
        // openedBy: d.recipient[0].read_count,
        if (d?.recipient.length > 0 && d?.Users) {
          if (d.recipient[0].Contact) {
            obj.status = d.recipient[0].status
            obj['moved'] = {
              from: { name: d?.recipient[0].Contact.Fname },
              to: { name: d.Users.full_name },
            }
          }
        } else {
          if (d?.from && d?.Users) {
            obj['moved'] = {
              from: { name: d.from },
              to: { name: d.Users.full_name },
            }
          }
          obj.eventName = d?.content?.subject
          if (d?.content?.body) {
            obj.description = d?.content?.body
            obj.displayCollapse = true
          }

          if (d?.attachment) {
            for (const val of d?.attachment) {
              if (val?.file_url) {
                //obj['pinItems'].push({ item: val.file_url })
                attachment.push({ item: val.file_url })
              }
              obj.letterUrl = getImage(attachment[0].item)
            }
            obj.pinItems = attachment
            attachment = []
          }

          //   moved: {
          //     from: { name: d.from },
          //     //to: { name: d.Users.full_name ?? '' },
          //   },
        }
        Communications.push(obj)
      }
      setCommunicationData(Communications)
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
          eventDateFormat={'DD-MM-YYYY, h:mm a'}
          pagination={pagination}
          setPagination={setPagination}
        />
      </ClientCardLayout>
    </div>
  )
}
export default CommunicationTab
