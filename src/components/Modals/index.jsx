import Sheet from 'react-modal-sheet'
import styled from 'styled-components'
import { TYPES_COLOR } from '../../constant/color'
import { LBS, FEET } from '../../constant/calculate'
import useSpecies from '../../hooks/useSpecies'

const Modals = ({ show, onClose, data }) => {
  if (!data) return null
  const { data: spesies } = useSpecies(data.id)
  const color = TYPES_COLOR[data.types[0].type.name]

  console.log(spesies)
  return (
    <>
      <Sheet rootId='root' isOpen={show} onClose={onClose}>
        <Sheet.Container style={{ backgroundColor: color }}>
          <Sheet.Header />
          <Sheet.Content>
            <div className='flex items-center justify-between p-5'>
              <p>About</p>
              <p>Stats</p>
              <p>Evolution</p>
            </div>

            <div className='block'>
              <p>{data.name}</p>
              <p>Pokédex Data</p>
              <p>{data.species.name}</p>
              <p>{(data.height / 10).toFixed(1)} height</p>
              <p>{(data.weight / 10).toFixed(1)} weight</p>
              <p>{LBS((data.weight / 10).toFixed(1))} lbs</p>
              <p>{FEET((data.height / 10).toFixed(1))}</p>
              {data.abilities.map((data, i) =>
                i > 0 ? (
                  <p key={i}>{data.ability.name}(hidden ability)</p>
                ) : (
                  <p key={i}>
                    {i + 1}.{data.ability.name}
                  </p>
                )
              )}
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
