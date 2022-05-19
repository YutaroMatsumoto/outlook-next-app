import React, {
  useContext,
  createContext,
  useState,
  MouseEventHandler,
  useEffect,
} from 'react'

import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { InteractionType, PublicClientApplication } from '@azure/msal-browser'
import { useMsal } from '@azure/msal-react'

import { config } from 'src/libs/config'

// Used by the Graph SDK to authenticate API calls

export interface AppUser {
  displayName?: string
  email?: string
  avatar?: string
  timeZone?: string
  timeFormat?: string
}

export interface AppError {
  message: string
  debug?: string
}

type AppContext = {
  user?: AppUser
  error?: AppError
  signIn?: MouseEventHandler<HTMLElement>
  signOut?: MouseEventHandler<HTMLElement>
  displayError?: Function
  clearError?: Function
  authProvider?: AuthCodeMSALBrowserAuthenticationProvider
}

const appContext = createContext<AppContext>({
  user: undefined,
  error: undefined,
  signIn: undefined,
  signOut: undefined,
  displayError: undefined,
  clearError: undefined,
  authProvider: undefined,
})

export function useAppContext(): AppContext {
  return useContext(appContext)
}

interface ProvideAppContextProps {
  children: React.ReactNode
}

export default function ProvideAppContext({
  children,
}: ProvideAppContextProps) {
  const auth = useProvideAppContext()
  return <appContext.Provider value={auth}>{children}</appContext.Provider>
}

function useProvideAppContext() {
  const msal = useMsal()

  const [user, setUser] = useState<AppUser | undefined>(undefined)
  const [error, setError] = useState<AppError | undefined>(undefined)

  const displayError = (message: string, debug?: string) => {
    setError({ message, debug })
  }

  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
    msal.instance as PublicClientApplication,
    {
      account: msal.instance.getActiveAccount()!,
      scopes: config.scopes,
      interactionType: InteractionType.Popup,
    }
  )

  const signIn = async () => {
    const result = await msal.instance.loginPopup({
      scopes: config.scopes,
      prompt: 'select_account',
    })

    // TEMPORARY: Show the access token
    displayError('Access token retrieved', result.accessToken)
  }

  const clearError = () => {
    setError(undefined)
  }

  const signOut = async () => {
    // TODO
  }

  return {
    user,
    error,
    signIn,
    signOut,
    displayError,
    clearError,
    authProvider,
  }
}
