import React from 'react'
import { Container } from 'react-bootstrap'
import NavBar from 'src/components/NavBar'
import 'bootstrap/dist/css/bootstrap.css'

type Props = {
  children: React.ReactNode
}

export default function BasicTemplate({ children }: Props) {
  return (
    <>
      <NavBar />
      <Container></Container>
      {children}
    </>
  )
}
