import React, { FC, useEffect, useState } from 'react'
import { Select, Spin } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import {
  useFindContactNameLazyQuery,
  useFindLeadNameLazyQuery,
  useFindManyContactsLazyQuery,
  useFindManyLeadsLazyQuery,
} from '@pabau/graphql'
import styles from './CreateFilterModal.module.less'
import { UserOutlined, AimOutlined } from '@ant-design/icons'
const { Option } = Select

interface ClientLeadSelectProps {
  name: string
  isEdit: boolean
  value?: string
  onChange?: (value: string) => void
  disabled: boolean
  className?: string
}

export const ClientLeadSelect: FC<ClientLeadSelectProps> = ({
  name,
  isEdit,
  value,
  onChange,
  disabled,
  className,
}) => {
  const [clientName, setClientName] = useState<string>()
  const [leadName, setLeadName] = useState<string>()
  const [leadOption, setLeadOption] = useState([])
  const [clientOption, setClientOption] = useState([])

  const [
    fetchContactName,
    { data: contactData },
  ] = useFindContactNameLazyQuery()
  const [fetchLeadName, { data: leadData }] = useFindLeadNameLazyQuery()
  const [
    fetchLead,
    { data: leadOptions, loading: leadLoading },
  ] = useFindManyLeadsLazyQuery()
  const [
    fetchContact,
    { data: contactOptions, loading: contactLoading },
  ] = useFindManyContactsLazyQuery()

  useEffect(() => {
    if (leadOptions?.findManyCmLead) {
      const item = leadOptions.findManyCmLead.map((item) => {
        return {
          label: `${item.Fname} ${item.Lname}`,
          value: item.id,
        }
      })
      setLeadOption(item)
    }
  }, [leadOptions, leadLoading])

  useEffect(() => {
    if (contactOptions?.findManyCmContact) {
      const item = contactOptions.findManyCmContact.map((item) => {
        return {
          label: `${item.Fname} ${item.Lname}`,
          value: item.id,
        }
      })
      setClientOption(item)
    }
  }, [contactOptions, contactLoading])

  useEffect(() => {
    if (contactData?.findFirstCmContact) {
      setClientName(
        contactData?.findFirstCmContact?.Fname +
          contactData?.findFirstCmContact?.Lname
      )
    }
    if (leadData?.findFirstCmLead) {
      setLeadName(
        leadData?.findFirstCmLead?.Fname + leadData?.findFirstCmLead?.Lname
      )
    }
  }, [contactData, leadData])

  const fetchLeadOption = (value: string) => {
    fetchLead({
      variables: {
        searchTerm: value,
      },
    })
  }

  const fetchClientOption = (value: string) => {
    fetchContact({
      variables: {
        searchTerm: value,
      },
    })
  }

  useEffect(() => {
    if (isEdit) {
      if (name === 'client' && value) {
        fetchContactName({
          variables: {
            contactID: Number.parseInt(value),
          },
        })
      } else if (name === 'lead' && value) {
        fetchLeadName({
          variables: {
            leadID: Number.parseInt(value),
          },
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit])

  return (
    <div className={className ? className : styles.clientWrapper}>
      <div className={styles.icon}>
        {name === 'client' ? <UserOutlined /> : <AimOutlined />}
      </div>
      <Select
        showSearch
        allowClear
        disabled={disabled}
        filterOption={false}
        onSearch={name === 'client' ? fetchClientOption : fetchLeadOption}
        value={(name === 'client' ? clientName : leadName) ?? value}
        onChange={(data) => {
          onChange(data)
          setClientName(undefined)
          setLeadName(undefined)
        }}
        notFoundContent={
          name === 'client'
            ? contactLoading && <Spin size="small" />
            : leadLoading && <Spin size="small" />
        }
        menuItemSelectedIcon={<CheckOutlined />}
        dropdownClassName={styles.customDropdown}
      >
        {name === 'client'
          ? clientOption.map((data) => (
              <Option key={data.value} value={data.value?.toString()}>
                {data.label}
              </Option>
            ))
          : leadOption.map((data) => (
              <Option key={data.value} value={data.value?.toString()}>
                {data.label}
              </Option>
            ))}
      </Select>
    </div>
  )
}
