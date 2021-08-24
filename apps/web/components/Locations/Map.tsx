import React, { FC, ReactNode, useEffect, useRef } from 'react'
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps'
import { compose, lifecycle, withProps } from 'recompose'
import marker from '../../assets/images/marker.png'
import { useTranslationI18 } from '../../hooks/useTranslationI18'
import { LocationDetails } from './LocationDetails'
import styles from './LocationsLayout.module.less'

const {
  StandaloneSearchBox,
} = require('react-google-maps/lib/components/places/StandaloneSearchBox') // eslint-disable-line @typescript-eslint/no-var-requires

interface MapProps {
  locationDetail: LocationDetails
  isMarkerShown?: boolean
  setLocationDetail: ReactNode
}

const apiKey = process.env.google_api_key

const getLocationDetails = (address_components, locationDetail) => {
  if (address_components) {
    for (const addressDetail of address_components) {
      const { types, long_name } = addressDetail
      if (types.includes('street_number')) {
        locationDetail.apt = long_name
      } else if (types.includes('postal_code')) {
        locationDetail.postcode = long_name
      } else if (types.includes('country')) {
        locationDetail.country = long_name
      } else if (types.includes('locality')) {
        locationDetail.city = long_name
      }
    }
    const region = []
    const area1 = address_components.find((item) =>
      item.types.includes('administrative_area_level_1')
    )
    area1 && region.push(area1.long_name)
    const area2 = address_components.find((item) =>
      item.types.includes('administrative_area_level_2')
    )
    area2 && region.push(area2.long_name)
    const sublocality = address_components.find((item) =>
      item.types.includes('sublocality_level_1')
    )
    const address = address_components.find((item) =>
      item.types.includes('sublocality_level_2')
    )
    const subAddress = address_components.find((item) =>
      item.types.includes('route')
    )
    locationDetail.subLocality = sublocality?.long_name ?? ''
    locationDetail.location = address?.long_name ?? subAddress?.long_name ?? ''
    locationDetail.region = region.join(', ')
  }
}
const addressFields = ['location', 'subLocality', 'city', 'region', 'country']

const Map: FC<MapProps> = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%`, width: '100%' }} />,
    mapElement: <div style={{ height: `100%`, borderRadius: 4 }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs: any = {} // eslint-disable-line  @typescript-eslint/no-explicit-any
      const { setLocationDetail, locationDetail: locationData } = this.props
      this.setState({
        places: [],
        // eslint-disable-next-line   @typescript-eslint/no-explicit-any
        onSearchBoxMounted: (ref: any) => {
          refs.searchBox = ref
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces()
          const placeDetail = places?.[0]
          const locationDetail = {
            postcode: '',
            apt: '',
            address: '',
            position: {
              lng: 0,
              lat: 0,
            },
            city: '',
            region: '',
            country: '',
            location: '',
            street: '',
            imageUrl: locationData.imageUrl,
          }

          const { geometry, address_components } = placeDetail
          const { location } = geometry
          locationDetail.position = { lat: location.lat(), lng: location.lng() }
          getLocationDetails(address_components, locationDetail)
          setLocationDetail(locationDetail)
        },
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(
  (props: {
    locationDetail
    onSearchBoxMounted
    bounds
    onPlacesChanged
    isMarkerShown
    setLocationDetail
  }) => {
    const searchRef = useRef(null)
    const { t } = useTranslationI18()
    useEffect(() => {
      if (props.locationDetail.address) {
        searchRef.current.value = props.locationDetail.address
      } else if (props.locationDetail.create) {
        navigator.geolocation.getCurrentPosition((item) => {
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.coords.latitude},${item.coords.longitude}&key=${apiKey}`
          )
            .then((response) => response.json())
            .then((res) => {
              const address_components = res.results?.[0]?.address_components
              const locationDetail = {
                postcode: '',
                apt: '',
                address: '',
                position: {
                  lng: 0,
                  lat: 0,
                },
                city: '',
                region: '',
                country: '',
                location: '',
                street: '',
                subLocality: '',
                imageUrl: props.locationDetail?.imageUrl,
              }
              locationDetail.position = {
                lat: item.coords.latitude,
                lng: item.coords.longitude,
              }
              getLocationDetails(address_components, locationDetail)
              props.setLocationDetail(locationDetail)
              const address = []
              for (const item of addressFields) {
                if (locationDetail[item]) {
                  address.push(locationDetail[item].split(',')[0])
                }
              }
              searchRef.current.value = address.join(', ')
            })
        })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (searchRef.current.value) {
        const locationDetail = {
          ...props.locationDetail,
          address: searchRef.current.value,
        }
        props.setLocationDetail(locationDetail)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchRef.current?.value])

    return (
      <GoogleMap
        defaultOptions={{
          disableDefaultUI: true,
        }}
        defaultZoom={14}
        center={props.locationDetail.position}
      >
        <div data-standalone-searchbox="">
          <div className={styles.locationSearchInput}>
            <div className={styles.locationSearchIcon}>
              <img alt={'marker-icon'} src={marker} />
            </div>
            <StandaloneSearchBox
              ref={props.onSearchBoxMounted}
              bounds={props.bounds}
              onPlacesChanged={props.onPlacesChanged}
            >
              <input
                ref={searchRef}
                type="text"
                className="ant-input"
                placeholder={t('setup.locations.location.search.placehodlder')}
              />
            </StandaloneSearchBox>
          </div>
        </div>
        {props.isMarkerShown && (
          <Marker position={props.locationDetail.position} />
        )}
      </GoogleMap>
    )
  }
)

export default Map
