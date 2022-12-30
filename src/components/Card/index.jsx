import { TYPES_COLOR, X_COLOR } from '../../constant/color'

const Card = key => {
  const color = TYPES_COLOR[key.types[0].type.name]
  const padId = key.id.toString().padStart(3, 0)

  return (
    <div key={key.id} onClick={key.onOpen}>
      <div
        className=' flex items-center  justify-between p-4  rounded-lg shadow-indigo-50 shadow-md'
        style={{ backgroundColor: color }}
      >
        <div>
          <h1 className='text-sm text-gray-500 font-bold'>{`#${padId}`}</h1>
          <h2 className='text-white text-2xl font-bold capitalize'>
            {key.title}
          </h2>
          {key.types.map((type, i) => (
            <button
              key={i}
              className='text-sm mt-6 mr-2 px-4 py-2 text-white rounded-lg font-laonoto tracking-wider outline-none'
              style={{ backgroundColor: X_COLOR[type.type.name].color }}
            >
              <div className='flex justify-between'>
                <img src={X_COLOR[type.type.name].btn} className='flex mr-2' />
                {type.type.name}
              </div>
            </button>
          ))}
        </div>
        <div>
          <img src={key.src} className='w-32 h-32' />
        </div>
      </div>
    </div>
  )
}
export default Card
