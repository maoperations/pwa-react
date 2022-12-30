import Sheet from 'react-modal-sheet'
import styled from 'styled-components'
import { TYPES_COLOR } from '../../constant/color'
import './index.css'
const Modals = ({ show, onClose, data }) => {
  if (!data) return null
  const color = TYPES_COLOR[data.types[0].type.name]

  return (
    <>
      <Sheet rootId='root' isOpen={show} onClose={onClose}>
        <Sheet.Container style={{ backgroundColor: color }}>
          <Sheet.Header />
          <Sheet.Content>
            <BoxList>
              {Array.from({ length: 50 })
                .fill(1)
                .map((_, i) => (
                  <Box key={i}>{i}</Box>
                ))}
            </BoxList>
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
