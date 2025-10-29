import Header from './components/Header.jsx'
import Hero from './components/home/Hero.jsx'
import Clients from './components/home/Clients.jsx'
import clientsData from './data/clients.js'

function App() {
  return (
    <>
      <Header/>
      <Hero/>
      <Clients clients={clientsData}/>
    </>
  )
}

export default App
