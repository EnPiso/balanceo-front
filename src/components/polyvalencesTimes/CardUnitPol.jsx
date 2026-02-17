
import ImageCardPol from './ImageCardPol'

const CardUnitPol = ({
  oper
}) => {

  return(
    <div className="bg-white rounded-lg shadow p-4 mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4 text-right">
        <ImageCardPol image={oper.avatar} />
        <div>
          <div className={`font-bold text-lg text-secondary_two`}>
              {oper.name}
          </div>
          <div className="text-xs text-zinc-500">cc {oper.id_oper}</div>
        </div>
      </div>
    </div>
  )
}

export default CardUnitPol