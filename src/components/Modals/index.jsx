import { useState, useEffect } from 'react'
import Sheet from 'react-modal-sheet'
import styled from 'styled-components'
import { TYPES_COLOR, X_COLOR } from '../../constant/color'
import { LBS, FEET } from '../../constant/calculate'
import useSpecies from '../../hooks/useSpecies'
import useEvolutions from '../../hooks/useEvolution'
import useImage from '../../hooks/useImage'

const Modals = ({ show, onClose, data }) => {
  if (!data) return null
  const { data: spesies } = useSpecies(data.id)
  const { data: evolution } = useEvolutions(spesies?.evolution_chain.url)
  const { mutateAsync } = useImage()
  const color = TYPES_COLOR[data.types[0].type.name]
  const padId = data.id.toString().padStart(3, 0)

  const [tabs, setTabs] = useState('about')
  const [evolutionImage, setEvolutionImage] = useState([])
  const [evolutionData, setEvolutionData] = useState([])
  const [evolutionLevel, setEvolutionLevel] = useState([])

  useEffect(() => {
    const images = []
    evolution?.chain?.evolves_to?.map(evo => {
      images.push(evolution?.chain.species.name, evo.species.name)
      evo.evolves_to.length && images.push(evo.evolves_to[0].species.name)
    })
    setEvolutionImage(images)
  }, [evolution])

  useEffect(() => {
    const images = []
    evolutionImage.map(name =>
      mutateAsync(name).then(res =>
        images.push(res.sprites.other.dream_world.front_default)
      )
    )
    setEvolutionData(images)
  }, [evolutionImage])

  useEffect(() => {
    const lvl = []
    evolution?.chain?.evolves_to?.map((evo, idx) => {
      lvl.push(evo.evolution_details[0].min_level)
      evo.evolves_to.length &&
        lvl.push(evo.evolves_to[0].evolution_details[0].min_level)
    })
    setEvolutionLevel(lvl)
  }, [evolution])

  console.log(spesies)
  console.log(data)
  return (
    <>
      <Sheet rootId='root' isOpen={show} onClose={onClose}>
        <Sheet.Container style={{ backgroundColor: color }}>
          <Sheet.Header>
            <div className='relative flex justify-center'>
              <div className='absolute -z-10'>
                <p className='outline-text uppercase opacity-50'>{data.name}</p>
              </div>

              <div className='relative flex items-center justify-center gap-10 pt-28'>
                <div className='absolute -left-3 -z-10'>
                  <img src='/Pokeball.svg' className='w-44 h-44 opacity-10' />
                </div>

                <div className='absolute -right-20'>
                  <img src='/Pattern.svg' className='w-32 h-32 opacity-80' />
                </div>

                <img
                  src={data.sprites.other['official-artwork'].front_default}
                  className='w-36 h-36'
                />
                <div>
                  <h1 className='text-[rgba(23,23,27,0.6)] font-bold'>{`#${padId}`}</h1>
                  <h2 className='text-white text-3xl font-bold capitalize'>
                    {data.name}
                  </h2>
                  {data.types.map((type, i) => (
                    <button
                      key={i}
                      className='text-sm mt-2 mr-2 px-4 py-2 text-white rounded-lg tracking-wider outline-none cursor-default'
                      style={{ backgroundColor: X_COLOR[type.type.name].color }}
                    >
                      <div className='flex justify-between'>
                        <img
                          src={X_COLOR[type.type.name].btn}
                          className='flex mr-2'
                        />
                        <p className='capitalize font-medium'>
                          {type.type.name}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between mx-20 py-5 text-white text-xl'>
              <p
                className='cursor-pointer'
                style={{ fontWeight: tabs === 'about' && '600' }}
                onClick={() => setTabs('about')}
              >
                About
              </p>
              <p
                className='cursor-pointer'
                style={{ fontWeight: tabs === 'stats' && '600' }}
                onClick={() => setTabs('stats')}
              >
                Stats
              </p>
              <p
                className='cursor-pointer'
                style={{ fontWeight: tabs === 'evolution' && '600' }}
                onClick={() => setTabs('evolution')}
              >
                Evolution
              </p>
            </div>
          </Sheet.Header>
          <Sheet.Content className='bg-white rounded-t-3xl p-5'>
            {tabs === 'about' && (
              <div>
                <p className='text-lg mb-5 text-[#747476]'>
                  {spesies?.flavor_text_entries[0].flavor_text}
                </p>

                <p className='font-semibold text-xl' style={{ color: color }}>
                  Pokédex Data
                </p>
                <table className='table-auto w-full md:w-1/2 border-separate border-spacing-y-4'>
                  <tbody>
                    <tr>
                      <td className='font-medium'>Species</td>
                      <td>{spesies?.genera[7].genus}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Height</td>
                      <td>
                        {(data.height / 10).toFixed(1)}m{' '}
                        {FEET((data.height / 10).toFixed(1))}
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Weight</td>
                      <td>
                        {(data.weight / 10).toFixed(1)}kg{' '}
                        {LBS((data.weight / 10).toFixed(1))} lbs
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Abilities</td>
                      <td>
                        {data.abilities.map((data, i) =>
                          i > 0 ? (
                            <p key={i} className='capitalize'>
                              {data.ability.name}
                              <span className='normal-case'>
                                (hidden ability)
                              </span>
                            </p>
                          ) : (
                            <span key={i}>
                              {i + 1}.{' '}
                              <span className='capitalize'>
                                {data.ability.name}
                              </span>
                            </span>
                          )
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className='font-semibold text-xl'
                        style={{ color: color }}
                      >
                        Training
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Catch Rate</td>
                      <td>{spesies?.capture_rate}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Base Exp</td>
                      <td>{data?.base_experience}</td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Growth Rate</td>
                      <td className='capitalize'>
                        {spesies?.growth_rate.name.replace('-', ' ')}
                      </td>
                    </tr>
                    <tr>
                      <td
                        className='font-semibold text-xl'
                        style={{ color: color }}
                      >
                        Breeding
                      </td>
                    </tr>
                    <tr>
                      <td className='font-medium'>Egg Groups</td>
                      {spesies?.egg_groups.map((e, i) => (
                        <span className='capitalize mr-1' key={i}>
                          {e.name}
                        </span>
                      ))}
                    </tr>
                  </tbody>
                </table>

                {/* <td>{spesies?.base_happiness}</td> */}
              </div>
            )}

            {tabs === 'stats' && (
              <div>
                <p className='font-semibold text-xl' style={{ color: color }}>
                  Base Stats
                </p>

                <table className='table-auto w-full border-separate border-spacing-y-4'>
                  <tbody>
                    {data.stats.map(stat => (
                      <tr>
                        <td className='font-medium w-20 capitalize'>
                          {stat.stat.name
                            .replace('special-attack', 'Sp. Atk')
                            .replace('special-defense', 'Sp. Def')}
                        </td>
                        <td className='w-10 px-2'>{stat.base_stat}</td>
                        <td>
                          <div className='!w-full h-1 rounded-full'>
                            <div
                              className='h-1 rounded-full'
                              style={{
                                width: `${stat.base_stat}%`,
                                backgroundColor: color
                              }}
                            ></div>
                          </div>
                        </td>
                        <td className='w-10 px-2'>200</td>
                        <td className='w-10 px-2'>294</td>
                      </tr>
                    ))}
                    <tr>
                      <td className='font-medium w-20 capitalize'>Total</td>
                      <td className='font-medium w-10 px-2 text-lg'>
                        {data.stats.reduce(
                          (acc, cur) => acc + cur.base_stat,
                          0
                        )}
                      </td>
                      <td className='w-full'></td>
                      <td className='font-medium w-10 px-2'>Min</td>
                      <td className='font-medium w-10 px-2'>Max</td>
                    </tr>
                  </tbody>
                </table>

                <p className='text-sm text-[#747476] font-medium'>
                  The ranges shown on the right are for a level 100 Pokémon.
                  Maximum values are based on a beneficial nature, 252 EVs, 31
                  IVs; minimum values are based on a hindering nature, 0 EVs, 0
                  IVs.
                </p>
              </div>
            )}

            {tabs === 'evolution' && (
              <div>
                <p className='font-semibold text-xl' style={{ color: color }}>
                  Evolution Chart
                </p>

                <table className='table-auto w-full border-separate'>
                  {evolution?.chain?.evolves_to.length ? (
                    evolutionData?.map((image, idx) => (
                      <tr
                        key={idx}
                        className='flex items-center justify-between mt-10'
                      >
                        {evolutionData?.[idx + 1] && (
                          <>
                            <div>
                              <img
                                src={image}
                                className='w-20 h-20 relative z-50'
                              />
                              <p className='font-semibold text-center mt-1 capitalize'>
                                {evolutionImage[idx]}
                              </p>
                            </div>

                            <div className='flex flex-col items-center'>
                              <img
                                src='/Vector.svg'
                                className='opacity-30 mb-1'
                              />
                              <p className='font-semibold'>
                                (Level {evolutionLevel[idx]})
                              </p>
                            </div>

                            <div>
                              <img
                                src={evolutionData[idx + 1]}
                                className='w-20 h-20'
                              />
                              <p className='font-semibold text-center mt-1 capitalize'>
                                {evolutionImage[idx + 1]}
                              </p>
                            </div>
                          </>
                        )}
                      </tr>
                    ))
                  ) : (
                    <tr>Pokemon not Evolution</tr>
                  )}
                </table>
              </div>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

const BoxList = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px;
  padding-top: 0px;
  overflow: auto;
`

const Box = styled.div`
  background-color: #eee;
  border-radius: 12px;
  min-height: 200px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 24px;
`

export default Modals
