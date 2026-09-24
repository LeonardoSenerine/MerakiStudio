import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Meaning } from './components/Meaning'
import { About } from './components/About'
import { Styles } from './components/Styles'
import { Portfolio } from './components/Portfolio'
import { Highlight } from './components/Highlight'
import { Artists } from './components/Artists'
import { Barbershop } from './components/Barbershop'
import { Booking } from './components/Booking'
import { Reviews } from './components/Reviews'
import { Footer } from './components/Footer'
import { useScrollAnimations } from './hooks/useScrollAnimations'

export default function App() {
  useScrollAnimations()

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Meaning />
        <About />
        <Styles />
        <Portfolio />
        <Highlight />
        <Artists />
        <Reviews />
        <Booking />
        <Barbershop />
      </main>
      <Footer />
    </>
  )
}
