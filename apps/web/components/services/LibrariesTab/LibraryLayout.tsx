import React, { FC, useEffect, useState } from 'react'
import { useLibraryInstallersQuery } from '@pabau/graphql'
import Libraries from './Libraries'

const LibraryLayout: FC = () => {
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
        libLocation: 'service',
      },
    }
    return queryOptions
  }

  const { data, error, loading } = useLibraryInstallersQuery(
    getQueryVariables()
  )

  useEffect(() => {
    if (!loading && data) {
      setLibItems(data?.library_installers)
    }
  }, [data, error, loading])

  return (
    <Libraries
      libItems={libItems}
      showLibraryInstaller={showLibraryInstaller}
      libraryIntallerData={libraryIntallerData}
      libraryInstaller={libraryInstaller}
      setLibraryInstaller={setLibraryInstaller}
    />
  )
}

export default LibraryLayout
