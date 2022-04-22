import { RootContextProvider } from '../context/rootContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RootContextProvider >
      <Component {...pageProps} />
    </RootContextProvider>
  )
}

export default MyApp
