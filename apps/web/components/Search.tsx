import { gql, useLazyQuery } from '@apollo/client'
import { Search as PabauSearch } from '@pabau/ui'
import { useRouter } from 'next/router'
import { FC, useState } from 'react'

const CLIENTS_QUERY = gql`
  query findContacts($searchTerm1: String, $searchTerm2: String) {
    findManyCmContact(
      where: {
        AND: [
          {
            OR: [
              { Fname: { contains: $searchTerm1 } }
              { Lname: { contains: $searchTerm1 } }
              { Mobile: { contains: $searchTerm1 } }
              { Email: { contains: $searchTerm1 } }
              { custom_id: { contains: $searchTerm1 } }
            ]
          }
          {
            OR: [
              { Fname: { contains: $searchTerm2 } }
              { Lname: { contains: $searchTerm2 } }
              { Mobile: { contains: $searchTerm2 } }
              { Email: { contains: $searchTerm2 } }
              { custom_id: { contains: $searchTerm2 } }
            ]
          }
        ]
      }
      take: 10
    ) {
      ID
      Fname
      Lname
      Email
      Mobile
      Avatar
      custom_id
    }
  }
`

const CLIENTS_ADVANCED_QUERY = gql`
  query findAdvancedContacts($where: CmContactWhereInput!) {
    findManyCmContact(where: $where, take: 10) {
      ID
      Fname
      Lname
      Email
      Mobile
      Avatar
      custom_id
    }
  }
`

const LEADS_ADVANCED_QUERY = gql`
  query findAdvancedLeads($where: CmLeadWhereInput!) {
    findManyCmLead(where: $where, take: 10) {
      ID
      Fname
      Lname
      Email
      Mobile
      Avatar
      custom_id
    }
  }
`

const LEADS_QUERY = gql`
  query findLeads($searchTerm1: String, $searchTerm2: String) {
    findManyCmLead(
      where: {
        AND: [
          {
            OR: [
              { Fname: { contains: $searchTerm1 } }
              { Lname: { contains: $searchTerm1 } }
              { Mobile: { contains: $searchTerm1 } }
              { Email: { contains: $searchTerm1 } }
              { custom_id: { contains: $searchTerm1 } }
            ]
          }
          {
            OR: [
              { Fname: { contains: $searchTerm2 } }
              { Lname: { contains: $searchTerm2 } }
              { Mobile: { contains: $searchTerm2 } }
              { Email: { contains: $searchTerm2 } }
              { custom_id: { contains: $searchTerm2 } }
            ]
          }
        ]
      }
      take: 10
    ) {
      ID
      Fname
      Lname
      Email
      Mobile
      Avatar
      custom_id
    }
  }
`

const SEARCH_BY_INVOICE_QUERY = gql`
  query findContactByInvoiceNum($invoice_number: String) {
    findFirstInvSale(where: { custom_id: { equals: $invoice_number } }) {
      CmContact {
        ID
        Fname
        Lname
        Email
        Mobile
        Avatar
        custom_id
      }
    }
  }
`

const SEARCH_BY_POLICY_NUMBER = gql`
  query findContactByInsuranceNum($policy_number: String) {
    findFirstContactInsurance(
      where: { membership_number: { equals: $policy_number } }
    ) {
      contact_id
      CmContact {
        Fname
        Lname
        Email
        Mobile
        Avatar
        custom_id
      }
    }
  }
`

enum SearchMode {
  Clients = 'Clients',
  Leads = 'Leads',
}

interface P {
  isHideLead?: boolean
  placeHolder?: string
}

const Search: FC<P> = ({ isHideLead = false, placeHolder }) => {
  const router = useRouter()
  const [searchFor, setSearchFor] = useState(SearchMode.Clients)
  const [searchTerms, setSearchTerms] = useState([])
  const [advancedSearch, setAdvancedSearch] = useState(false)
  const variables = []

  let SEARCH_QUERY = null
  switch (searchFor) {
    case SearchMode.Clients:
      if (advancedSearch) {
        SEARCH_QUERY = CLIENTS_ADVANCED_QUERY
      } else {
        SEARCH_QUERY = CLIENTS_QUERY
      }
      break
    case SearchMode.Leads:
      if (advancedSearch) {
        SEARCH_QUERY = LEADS_ADVANCED_QUERY
      } else {
        SEARCH_QUERY = LEADS_QUERY
      }
      break
  }

  if (SEARCH_QUERY && advancedSearch && searchTerms !== []) {
    if (searchTerms['invoiceNumber']) {
      variables['invoice_number'] = searchTerms['invoiceNumber']
      SEARCH_QUERY = SEARCH_BY_INVOICE_QUERY
    } else if (searchTerms['policyNumber']) {
      variables['policy_number'] = searchTerms['policyNumber']
      SEARCH_QUERY = SEARCH_BY_POLICY_NUMBER
    } else {
      variables['where'] = {}
      variables['where'].AND = []

      for (const key in searchTerms) {
        if (key === 'is_active' && searchFor !== SearchMode.Leads) {
          if (!searchTerms[key]) {
            variables['where'].AND.push({ [key]: { equals: 1 } })
          }
        } else if (typeof searchTerms[key] !== 'undefined' && key) {
          variables['where'].AND.push({ [key]: { contains: searchTerms[key] } })
        }
      }
    }
  } else if (searchTerms.length > 0) {
    variables['searchTerm1'] = searchTerms[0]
    if (searchTerms[1] !== '') {
      variables['searchTerm2'] = searchTerms[1]
    }
  }

  const [loadContacts, { data }] = useLazyQuery(SEARCH_QUERY, {
    variables: variables,
  })

  let results = []

  if (data?.CmContact) {
    results = [data.CmContact]
  } else if (data?.findFirstInvSale) {
    results = [data.findFirstInvSale.CmContact]
  } else if (data?.findFirstContactInsurance) {
    results = [data.findFirstContactInsurance.CmContact]
  } else if (data?.findManyCmContact) {
    results = data.findManyCmContact
  } else if (data?.findManyCmLead) {
    results = data.findManyCmLead
  }
  const setSearchMode = (mode: SearchMode) => {
    //setSearchTerms([])
    setSearchFor(mode)
  }

  const advancedSearchHandler = (formData) => {
    setSearchTerms(formData)
    setAdvancedSearch(true)
  }

  const resultSelectedHandler = (id: number) => {
    router.push({
      pathname: '/clients/[id]',
      query: { id: id },
    })
  }

  return (
    <PabauSearch
      searchResults={results?.map(
        ({ ID, Fname, Lname, Avatar, Email, Mobile, ...rest }) => ({
          id: ID,
          firstName: Fname,
          lastName: Lname,
          avatarUrl: Avatar,
          mobile: Mobile,
          email: Email,
          ...rest,
        })
      )}
      advancedSearchHandler={advancedSearchHandler}
      changeSearchMode={setSearchMode}
      resultSelectedHandler={resultSelectedHandler}
      onChange={(e) => {
        const bits = e.split(' ')
        const wordBits = []

        for (const bit of bits) {
          wordBits.push(bit + '%')
        }
        if (wordBits.length < 2) {
          wordBits.push('%')
        }
        if (wordBits.length < 2) {
          wordBits.push('%')
        }
        setAdvancedSearch(false)
        setSearchTerms([...wordBits])
        loadContacts()
      }}
      isHideLead={isHideLead}
      placeHolder={placeHolder}
    />
  )
}

export default Search
