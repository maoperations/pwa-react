import Sheet from 'react-modal-sheet'
import { TYPES_COLOR, X_COLOR } from '../../constant/color'
import {
  LBS,
  FEET,
  calculateWeakness,
  calculateWeakness1
} from '../../constant/calculate'
import useSpecies from '../../hooks/useSpecies'

const Modals = ({ show, onClose, data }) => {
  if (!data) return null
  const { data: spesies } = useSpecies(data.id)

  const color = TYPES_COLOR[data.types[0].type.name]
  const padId = data.id.toString().padStart(3, 0)

  data.types.map(e =>
    calculateWeakness(e.type.name).then(result => {
      const p = result.weaknesses?.filter(
        weak => !result.resistances?.map(res => res.name).includes(weak.name)
      )
      console.log(p, 'static')
    })
  )

  calculateWeakness1('grass', 'poison').then(result => {
    const p = result.weaknesses?.filter(
      weak => !result.resistances?.map(res => res.name).includes(weak.name)
    )
    console.log(p)
  })

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
                <div className='absolute right-60 -z-10'>
                  <img src='/Pokeball.svg' className='w-48 h-48 opacity-10' />
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

            <div className='flex items-center justify-between p-5'>
              <p>About</p>
              <p>Stats</p>
              <p>Evolution</p>
            </div>
          </Sheet.Header>
          <Sheet.Content className='bg-white rounded-t-3xl p-5'>
            <div className=''>
              <p className='font-semibold text-xl' style={{ color: color }}>
                Pokédex Data
              </p>
              <table className='table-auto w-1/2 border-separate border-spacing-y-4'>
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
                </tbody>
              </table>
              <p>{data.base_experience}</p>
              <p>{spesies?.base_happiness}</p>
              <p>{spesies?.capture_rate}</p>
              <p>{spesies?.growth_rate.name}</p>
              {spesies?.egg_groups.map((e, i) => (
                <p key={i}>{e.name}</p>
              ))}
              <p>{spesies?.flavor_text_entries[0].flavor_text}</p>
            </div>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  )
}

export default Modals
