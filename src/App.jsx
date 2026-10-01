import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero'
import Apology from './components/Apology'
import LittleThings from './components/LittleThings'
import ApologyPackage from './components/ApologyPackage'
import TapHeart from './components/TapHeart'
import Finale from './components/Finale'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Hero />
      <main>
        <Apology />
        <LittleThings />
        <ApologyPackage />
        <TapHeart />
      </main>
      <Finale />
    </MotionConfig>
  )
}
