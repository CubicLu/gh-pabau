import React, { FC, useState, useEffect } from 'react'
import { gql } from '@apollo/client'
import { LibraryCard, LibraryModal, useLiveQuery } from '@pabau/ui'
import { Row, Col } from 'antd'

const LIST_QUERY = gql`
  query library_installers($limit: Int, $libLocation: String) {
    library_installers(
      limit: $limit
      where: { library_location: { _ilike: $libLocation } }
    ) {
      library_name
      library_image
      library_description
      library_location
      library_language
      is_plus
      data
      created_date
      id
    }
  }
`

export interface P {
  title?: string
}

export const LibrariesTab: FC<P> = ({ ...props }) => {
  const [libItems, setLibItems] = useState([])
  const [libraryInstaller, setLibraryInstaller] = useState(false)
  const [libraryIntallerData, setLibraryInstallerData] = useState(null)

  const showLibraryInstaller = (item) => {
    setLibraryInstallerData(item)
    setLibraryInstaller((libraryInstaller) => !libraryInstaller)
  }

  const getQueryVariables = () => {
    const queryOptions = {
      variables: {
        limit: 10,
        libLocation: 'drug',
      },
    }
    return queryOptions
  }

  const { data, loading } = useLiveQuery(LIST_QUERY, getQueryVariables())

  useEffect(() => {
    if (!loading && data) {
      setLibItems(data)
    }
  }, [data, loading])

  return (
    <Row>
      {libItems.length > 0 &&
        libItems.map((el, key) => (
          <Col lg={6} md={8} sm={16} xs={24} key={`col-key-${key * 123}`}>
            <LibraryCard
              onClick={() => showLibraryInstaller(el)}
              title={el.library_name}
              isPlus={el.is_plus}
              bundleCount={el.data?.length}
            />
          </Col>
        ))}

      <Col md={24}>
        {libraryIntallerData && (
          <LibraryModal
            image={
              libraryIntallerData?.library_image ||
              'https://wallpaperaccess.com/full/271965.jpg'
            }
            title={libraryIntallerData?.library_name}
            subTitle={libraryIntallerData?.library_description}
            visible={libraryInstaller}
            bundleTypes={libraryIntallerData?.data}
            onClose={() =>
              setLibraryInstaller((libraryInstaller) => !libraryInstaller)
            }
          />
        )}
      </Col>
    </Row>
  )
}

export default LibrariesTab
