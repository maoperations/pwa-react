import { useState, useEffect } from 'react'
import pokemon from '../../hooks/pokemon'
import Card from '../../components/Card'
import Modals from '../../components/Modals'

const Home = () => {
  const { data } = pokemon()
  const [pokemonData, setPokemonData] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [dataModal, setDataModal] = useState()

  const fetchPokemon = async url => {
    const response = await fetch(`${url}`)
    return await response.json()
  }

  const onOpenModal = pokemon => {
    setDataModal(pokemon)
    setShowModal(true)
  }

  const onCloseModal = () => {
    setDataModal()
    setShowModal(false)
  }

  useEffect(() => {
    if (data) {
      data?.results.forEach(async element => {
        const pokemon = await fetchPokemon(element.url)
        setPokemonData(prevValue =>
          [...prevValue, pokemon].sort((a, b) => a.id - b.id)
        )
      })
    }
  }, [data])
  return (
    <>
      <div className='App p-4'>
        <h1 className='text-4xl font-bold'>Pokédex</h1>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
          {pokemonData?.map((poke, i) => (
            <Card
              key={i}
              title={poke.name}
              types={poke.types}
              id={poke.id}
              src={poke.sprites.other['official-artwork'].front_default}
              onOpen={() => onOpenModal(poke)}
            />
          ))}
        </div>
      </div>
      <Modals data={dataModal} show={showModal} onClose={onCloseModal} />
    </>
  )
}

export default Home
