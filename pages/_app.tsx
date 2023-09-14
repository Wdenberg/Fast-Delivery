import { Provider as AppContextProvider } from '../contexts/app'
import { Provider as AppAuthProvider } from '../contexts/auth'
import '../styles/globals.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (

    <AppAuthProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>

    </AppAuthProvider>
  );


}

export default MyApp
