import ErrorMessage from 'src/components/ErrorMessage'
import Welcome from 'src/components/Welcome'
import 'bootstrap/dist/css/bootstrap.css'
import BasicTemplate from '../templates/BasicTemplate'

export default function Home() {
  return (
    <BasicTemplate>
      <ErrorMessage />
      <Welcome />
    </BasicTemplate>
  )
}
