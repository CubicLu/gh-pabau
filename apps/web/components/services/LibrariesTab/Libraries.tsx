import React, { FC } from 'react'
import { LibraryCard, LibraryModal } from '@pabau/ui'
import { Col, Row } from 'antd'
import styles from './LibraryTab.module.less'

interface LibrariesProps {
  libItems: LibItemType[]
  showLibraryInstaller: (e) => void
  libraryIntallerData: LibItemType
  libraryInstaller: boolean
  setLibraryInstaller: (e) => void
}

interface LibItemType {
  id: string
  library_name: string
  library_location: string
  library_language: string
  library_image: string
  library_description: string
  is_plus: boolean
  created_date: string
  data: LibItemDataType[]
}

interface LibItemDataType {
  bundleType: string
  removed: boolean
  title: string
}

const Libraries: FC<LibrariesProps> = ({
  libItems,
  showLibraryInstaller,
  libraryIntallerData,
  libraryInstaller,
  setLibraryInstaller,
}) => {
  return (
    <Row className={styles.library}>
      {libItems.length > 0 &&
        libItems.map((el, key) => (
          <Col lg={6} md={8} sm={8} xs={24} key={`col-key-${key * 123}`}>
            <LibraryCard
              title={el.library_name}
              bundleCount={el.data?.length}
              isPlus={el.is_plus}
              onClick={() => showLibraryInstaller(el)}
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

export default Libraries
