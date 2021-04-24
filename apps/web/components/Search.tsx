import { FC, useState } from 'react'
import { gql } from '@apollo/client'
import { useLiveQuery, Search as PabauSearch } from '@pabau/ui'
import { useRouter } from 'next/router'

const CLIENTS_QUERY = gql`
  query findContacts($searchTerm1: String, $searchTerm2: String) {
    cmContacts(
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

const LEADS_QUERY = gql`
  query findLeads($searchTerm1: String, $searchTerm2: String) {
    cmLeads(
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

enum SearchMode {
  Clients = 'Clients',
  Leads = 'Leads',
}

const Search: FC = () => {
  const router = useRouter()
  const [searchFor, setSearchFor] = useState(SearchMode.Clients)
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const variables = { searchTerm1: searchTerms[0] }
  if (searchTerms[1] !== '') {
    variables['searchTerm2'] = searchTerms[1]
  }

  let SEARCH_QUERY = CLIENTS_QUERY
  if (searchFor === SearchMode.Leads) {
    SEARCH_QUERY = LEADS_QUERY
  }
  const { data } = useLiveQuery(SEARCH_QUERY, {
    variables: variables,
  })

  const setSearchMode = (mode: SearchMode) => {
    setSearchFor(mode)
  }

  const resultSelectedHandler = (id: number) => {
    router.push({
      pathname: '/clients/[id]',
      query: { id: id },
    })
  }

  return (
    <PabauSearch
      searchResults={data?.map(
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

        setSearchTerms([...wordBits])
      }}
    />
  )
}

export default Search
