// import App from "next/app";
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'

//TODO: ideally remove these
import 'react-phone-input-2/lib/style.css'
import 'react-quill/dist/quill.snow.css'
import 'react-image-crop/dist/ReactCrop.css'

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://api.new.pabau.com/v1/graphql',
  cache: new InMemoryCache(),
})

// https://github.com/myeongjae-kim/next-js-with-typescript-valid-app-type/blob/master/pages/_app.tsx
const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
}) => {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.

// MyApp.getInitialProps = async (appContext) => {
//   const appProps = await App.getInitialProps(appContext)
//   return { ...appProps }
// }

export default MyApp
