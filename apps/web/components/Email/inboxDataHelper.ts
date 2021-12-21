import dayjs from 'dayjs'

export const checkMailPrivacy = (mailData, privacyData) => {
  const checkingMail = [...mailData]
  const temp = []
  checkingMail.map((mail) => {
    const privacyFind = privacyData?.checkEmailPrivacy.find(
      (privacy) => mail.messageId === privacy.messageId
    )
    if (privacyFind) {
      temp.push({
        ...mail,
        privacy: privacyFind.privacySetting,
      })
    }
    return 1
  })
  return temp
}

export const updateLeadClient = (emailVal, checkLeadClient) => {
  const temp = []
  emailVal.map((mail) => {
    const leadFind = checkLeadClient?.checkEmailLink.find(
      (status) => mail.sender === status.email && status.type === 'lead'
    )
    const clientFind = checkLeadClient?.checkEmailLink.find(
      (status) => mail.sender === status.email && status.type === 'contact'
    )
    if (leadFind) {
      temp.push({
        ...mail,
        status: 'lead',
        lead: leadFind.fistName + ' ' + leadFind.lastName,
        roleId: leadFind.id,
      })
    } else if (clientFind) {
      temp.push({
        ...mail,
        status: 'client',
        client: clientFind.fistName + ' ' + clientFind.lastName,
        roleId: clientFind.id,
      })
    } else {
      temp.push({
        ...mail,
        status: 'no',
      })
    }
    return 1
  })
  return temp
}

export const extractData = (finalEmails, sent = 0) => {
  return finalEmails.map((itm: any) => {
    const rowData = {
      name: '',
      time: '',
      subject: '',
      isAttched: false,
      sender: '',
      lead: '',
      messageId: '',
    }

    if (itm.payload.mimeType === 'multipart/mixed') {
      rowData.isAttched = true
    }
    itm.payload.headers.map((header, i) => {
      if (sent) {
        if (header.name === 'To') {
          rowData.name = header.value.split('<')
          rowData.sender = rowData.name[rowData.name.length - 1].split('>')[0]
        }
      } else {
        if (header.name === 'From') {
          rowData.name = header.value.split('<')
          rowData.sender = rowData.name[rowData.name.length - 1].split('>')[0]
        }
      }

      if (header.name === 'Date') {
        rowData.time = header.value
      }
      if (header.name === 'Subject') {
        rowData.subject = header.value
      }
      if (header.name.toLowerCase() === 'message-id') {
        rowData.messageId = header.value.split('@')[0].split('<')[1]
      }

      return 1
    })

    const todayDiff = dayjs().diff(dayjs(rowData.time), 'day')
    const yearDiff = dayjs().diff(dayjs(rowData.time), 'year')

    if (todayDiff === 0) {
      rowData.time = `${dayjs(rowData.time).format('HH:mm')}`
    } else if (yearDiff === 0) {
      rowData.time = `${dayjs(rowData.time).format('DD MMM ')}`
    } else if (yearDiff > 0) {
      rowData.time = `${dayjs(rowData.time).format('DD MMM YYYY')}`
    }

    return {
      ...rowData,
      id: itm.id,
      key: itm.threadId,
      name: {
        name: rowData.name[0],
        status: itm.labelIds.includes('UNREAD'),
      },
      isAttched: rowData.isAttched,
      subject: { name: rowData.subject, subject: itm.snippet },
      sender: rowData.sender,
      messageId: rowData.messageId,
    }
  })
}
