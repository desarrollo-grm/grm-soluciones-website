import Header from '/src/components/layout/Header.jsx'
import Hero from '/src/components/home/Hero.jsx'
import Clients from '/src/components/home/Clients.jsx'
import clientsData from '/src/data/clients.js'
import ProductsServices from '/src/components/home/ProductsServices.jsx'
import Footer from '/src/components/layout/Footer.jsx'
import Articulos from '/src/components/home/Articulos.jsx'
import Values from '/src/components/about-us/Values.jsx'
import Objectives from '/src/components/about-us/Objectives.jsx'

function App() {
  return (
    <>
      <Header/>
      <Hero/>
      <Clients clients={clientsData}/>
      <ProductsServices/>
      <Articulos/>
      <Values/>
      <Objectives/>
      <Footer/>
    </>
  )
}

export default App
