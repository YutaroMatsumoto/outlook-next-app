import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import { MsalProvider } from '@azure/msal-react'
import ProvideAppContext from 'src/contexts/AppContext'
import {
  PublicClientApplication,
  EventType,
  EventMessage,
  AuthenticationResult,
} from '@azure/msal-browser'
import { config } from 'src/libs/config'

const msalInstance = new PublicClientApplication({
  auth: {
    clientId: config.appId,
    redirectUri: config.redirectUri,
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: true,
  },
})

// Check if there are already accounts in the browser session
// If so, set the first account as the active account
const accounts = msalInstance.getAllAccounts()
if (accounts && accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

msalInstance.addEventCallback((event: EventMessage) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
    // Set the active account - this simplifies token acquisition
    const authResult = event.payload as AuthenticationResult
    msalInstance.setActiveAccount(authResult.account)
  }
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MsalProvider instance={msalInstance}>
      <ProvideAppContext>
        <Component {...pageProps} />
      </ProvideAppContext>
    </MsalProvider>
  )
}

export default MyApp
