// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { MsalProvider } from '@azure/msal-react'
import { IPublicClientApplication } from '@azure/msal-browser'

import ProvideAppContext from 'src/contexts/AppContext'
import ErrorMessage from 'src/components/ErrorMessage'
import NavBar from 'src/components/NavBar'
import Welcome from 'src/components/Welcome'
import 'bootstrap/dist/css/bootstrap.css'

type AppProps = {
  pca: IPublicClientApplication
}

export default function Home({ pca }: AppProps) {
  return (
    <MsalProvider instance={pca}>
      <ProvideAppContext>
        {/* <Router> */}
        <NavBar />
        <Container>
          <ErrorMessage />
          {/* <Route exact path="/" render={(props) => <Welcome {...props} />} /> */}
          <Welcome />
        </Container>
        {/* </Router> */}
      </ProvideAppContext>
    </MsalProvider>
  )
}
