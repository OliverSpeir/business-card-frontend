// import Image from 'next/image'
import Header from './components/Header'
import Form from './components/Form'
import Footer from './components/Footer'
import AuthButtons from './components/AuthButtons'

export default function Home() {
  return (
    <>
    <main>
      <Header/>
      <AuthButtons/>
      <Form/>
      <Footer/>
    </main>
    </>
  )
}
